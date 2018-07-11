// @flow
import { Router as router } from "express";
import sheypoor from "./sheypoor";
import divar from "./divar";

const route = router();

route.use("/sheypoor", sheypoor);
route.use("/divar", divar);

export default route;
