import express from "express";

import routes from "./routes";
import {
  transformToAPIFailureResponse,
  initialiseContexts,
} from "./middleware";

const app = express();
const port = 3000;

const initialiseContextsFn = initialiseContexts({
  requestContext: { foo: "foo", now: new Date() },
  responseContext: { bar: "bar" },
});

app.use(initialiseContextsFn);
app.use(routes);
app.use(transformToAPIFailureResponse);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
