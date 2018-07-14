// @flow
import { Router as router } from "express";
import { scrape as scrapeMiddleware } from "../middlewares";
import scrapers from "./scrapers";
import availablePlaces from "./availablePlaces";
import healthCheck from "./healthCheck";

const route = router();

route.use("/", healthCheck);
route.use("/places", availablePlaces);
route.use("/scrape", scrapeMiddleware, scrapers);

export default route;
