import { ParsedQs } from "qs";

import { ErrorRequestHandler, RequestHandler } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { z } from "zod";
import { function as F, either as E } from "fp-ts";

import {
  RequestContentLocation,
  APIResponseBodyFailure,
  RequestContext,
  ResponseContext,
} from "./types";
import { parseZ } from "./utils";
import { RequestValidationError } from "./errors";

export const initialiseContexts =
  ({
    requestContext,
    responseContext,
  }: {
    requestContext: RequestContext;
    responseContext: ResponseContext;
  }): RequestHandler =>
  (req, res, next) => {
    req.context = requestContext;
    res.context = responseContext;

    return next();
  };

export const validateRequest =
  <T>({
    requestContentLocation,
    zodType,
  }: {
    requestContentLocation: RequestContentLocation;
    zodType: z.ZodType<T>;
  }): RequestHandler =>
  (req, _, next) => {
    const requestContentParser = parseZ(zodType);
    const requestContent = req[requestContentLocation];

    return F.pipe(
      requestContentParser(requestContent),
      E.fold(
        (err) => next(new RequestValidationError(requestContentLocation, err)),
        () => next()
      )
    );
  };

export const validateRequestBody = <T>(
  zodType: z.ZodType<T>
): RequestHandler<any, any, T, any, any> =>
  validateRequest({ requestContentLocation: "body", zodType });

export const validateRequestQueries = <T extends ParsedQs>(
  zodType: z.ZodType<T>
): RequestHandler<any, any, any, T, any> =>
  validateRequest({ requestContentLocation: "query", zodType });

export const validateRequestParams = <T extends ParamsDictionary>(
  zodType: z.ZodType<T>
): RequestHandler<T, any, any, any, any> =>
  validateRequest({ requestContentLocation: "params", zodType });

export const transformToAPIFailureResponse: ErrorRequestHandler<
  any,
  APIResponseBodyFailure<unknown>
> = (err, _, res, next) => {
  if (err instanceof RequestValidationError) {
    const { requestContentLocation: location, zodError } = err;

    return res.status(400).json({
      success: false,
      result: null,
      error: {
        location,
        zodErrors: zodError.errors,
      },
    });
  }

  // Handle other errors here.

  return next(err);
};
