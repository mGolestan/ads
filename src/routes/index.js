// @flow
import { Router as router } from "express";
import scrapers from "./scrapers";
import availablePlaces from "./availablePlaces";
import healthCheck from "./healthCheck";
import { scrape as scrapeMiddleware } from "../middlewares";

const route = router();

route.use("/", healthCheck);
route.use("/places", availablePlaces);
route.use("/scrape", scrapeMiddleware, scrapers);

export default route;
