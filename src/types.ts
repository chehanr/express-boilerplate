import { z } from "zod";

export type RequestContext = {
  foo: string;
  now: Date;
};

export type ResponseContext = {
  bar: string;
};

declare global {
  namespace Express {
    interface Request {
      context: RequestContext;
    }

    interface Response {
      context: ResponseContext;
    }
  }
}

export type RequestContentLocation = "body" | "params" | "query";

export type APIResponseBodySuccessful<T = null> = {
  success: true;
  result: T;
  error: null;
};

export type APIResponseBodyFailure<T> = {
  success: false;
  result: null;
  error: T;
};

export type APIResponseBody<T> =
  | APIResponseBodySuccessful<T>
  | APIResponseBodyFailure<T>;

// Example endpoint stuff ->

export const ExampleRequestQueriesZ = z.object({ foo: z.string().optional() });

export type ExampleRequestQueries = z.infer<typeof ExampleRequestQueriesZ>;

export const ExampleRequestBodyZ = z
  .object({ bar: z.string().optional() })
  .optional();

export type ExampleRequestBody = z.infer<typeof ExampleRequestBodyZ>;

export const ExampleRequestParamsZ = z.object({ baz: z.string().optional() });

export type ExampleRequestParams = z.infer<typeof ExampleRequestParamsZ>;

export type ExampleAPIResponseBody = APIResponseBodySuccessful<{
  queries: Record<string, unknown>;
  body: Record<string, unknown>;
  params: Record<string, unknown>;
  requestContext: Record<string, unknown>;
  responseContext: Record<string, unknown>;
}>;
