// @flow
import { Router as router } from "express";

const route = router();

route.get("/", (req, res) => {
  res.send({
    status: "ok"
  });
});

export default route;
