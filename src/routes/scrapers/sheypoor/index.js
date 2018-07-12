// @flow
import { Router as router } from "express";
import { wrap } from "async-middleware";
import urlencode from "urlencode";
import scrape from "./scrap";
import { Place } from "../../../utils/places";

const route = router();

route.get(
  "/",
  wrap((req: express$Request, res: express$Response) => {
    const searchQuery = urlencode(req.query.q);

    const SheypoorGlobalSearchKey = "search";
    let searchCity;
    req.query.city
      ? (searchCity = urlencode(Place.findByCitySlug(req.query.city).name))
      : (searchCity = SheypoorGlobalSearchKey);

    const url = `https://www.sheypoor.com/${searchCity}?q=${searchQuery}`;

    scrape(url, results => {
      res.send({ version: 1, results });
    });
  })
);

export default route;
