// @flow
import { Router as router } from "express";
import { wrap } from "async-middleware";
import urlencode from "urlencode";
import { Place } from "../../../utils/places";
import type { SheypoorItemsType } from "../../../flowTypes";
import scrape from "./scrap";

const route = router();

route.get(
  "/",
  wrap((req: express$Request, res: express$Response) => {
    const searchQuery = urlencode(req.query.q);

    const SheypoorGlobalSearchKey = "search";
    let searchCity;
    if (req.query.city)
      searchCity = urlencode(Place.findByCitySlug(req.query.city).name);
    else searchCity = SheypoorGlobalSearchKey;

    const url = `https://www.sheypoor.com/${searchCity}?q=${searchQuery}`;

    scrape(url, (results: Array<SheypoorItemsType>) => {
      res.send({ version: 1, results });
    });
  })
);

export default route;
