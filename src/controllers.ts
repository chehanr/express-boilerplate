import { RequestHandler } from "express";

import {
  ExampleAPIResponseBody,
  ExampleRequestBody,
  ExampleRequestQueries,
  ExampleRequestParams,
} from "./types";

export const exampleController: RequestHandler<
  ExampleRequestParams,
  ExampleAPIResponseBody,
  ExampleRequestBody,
  ExampleRequestQueries
> = (req, res) => {
  res.send({
    success: true,
    result: {
      queries: req.query,
      body: req.body || {},
      params: req.params,
      requestContext: req.context,
      responseContext: res.context,
    },
    error: null,
  });
};
