// @flow
import { Router as router } from "express";
import { wrap } from "async-middleware";
import { Place } from "../utils/places";

const route = router();

route.get(
  "/",
  wrap((req: express$Request, res: express$Response) =>
    res.send({ results: Place.getAll() })
  )
);

export default route;
