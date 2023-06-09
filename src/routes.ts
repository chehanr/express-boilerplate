import { Router } from "express";
import bodyParser from "body-parser";

import { exampleController } from "./controllers";
import {
  ExampleRequestBodyZ,
  ExampleRequestQueriesZ,
  ExampleRequestParamsZ,
} from "./types";
import {
  validateRequestBody,
  validateRequestQueries,
  validateRequestParams,
} from "./middleware";

export const router = Router();

export const validateExampleRequestQueriesFn = validateRequestQueries(
  ExampleRequestQueriesZ
);
export const validateExampleRequestBodyFn =
  validateRequestBody(ExampleRequestBodyZ);
export const validateExampleRequestParamsFn = validateRequestParams(
  ExampleRequestParamsZ
);

router.post(
  "/:baz?",
  bodyParser.json(),
  validateExampleRequestQueriesFn,
  validateExampleRequestBodyFn,
  validateExampleRequestParamsFn,
  exampleController
);

export default router;
