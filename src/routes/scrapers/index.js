// @flow
import { Router as router } from "express";
import sheypoor from "./sheypoor";
import divar from "./divar";
import globalScraper from "./globalScraper";

const route = router();

route.use("/sheypoor", sheypoor);
route.use("/divar", divar);
route.use("/", globalScraper);

export default route;
