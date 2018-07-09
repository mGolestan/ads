// @flow
import { Router as router } from "express";
import scrapers from "./scrapers";
import healthCheck from "./healthCheck";

const route = router();

route.use("/", healthCheck);
route.use("/scrape", scrapers);

export default route;
