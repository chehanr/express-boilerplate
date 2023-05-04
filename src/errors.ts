import { ZodError } from "zod";

import { RequestContentLocation } from "./types";

export class RequestValidationError extends Error {
  requestContentLocation: RequestContentLocation;
  zodError: ZodError;

  constructor(
    requestContentLocation: RequestContentLocation,
    zodError: ZodError
  ) {
    super("Request validation error");

    this.requestContentLocation = requestContentLocation;
    this.zodError = zodError;
  }
}
