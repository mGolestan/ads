// @flow
import { Router as router } from "express";
import { wrap } from "async-middleware";
import { Place } from "../utils/city";

import "../utils/city/data";

const route = router();

route.get(
  "/",
  wrap((req: express$Request, res: express$Response) =>
    res.send(Place.getAll())
  )
);

export default route;
