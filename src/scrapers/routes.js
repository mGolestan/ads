// @flow
import { Router as router } from "express";
import sheypoor from "./sheypoor";

const route = router();

route.use("/", sheypoor);

export default route;
