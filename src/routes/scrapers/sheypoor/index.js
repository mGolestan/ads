// @flow
import { Router as router } from "express";
import { wrap } from "async-middleware";
import urlencode from "urlencode";
import { Place } from "../../../utils/places";
import type { SheypoorItemsType } from "../../../flowTypes";
import scrape from "./scrap";

type RequestWithSheypoorParamsType = express$Request & {
  query: {
    q: string,
    page?: number,
    specifics?: { [string]: { [string]: any } } // eslint-disable-line flowtype/no-weak-types
  }
};

const route = router();

route.get(
  "/",
  wrap((req: RequestWithSheypoorParamsType, res: express$Response) => {
    const searchQuery = urlencode(req.query.q);
    const { page } = req.query;

    const SheypoorGlobalSearchKey = "search";
    let searchCity;
    if (req.query.city)
      searchCity = urlencode(Place.findByCitySlug(req.query.city).name);
    else searchCity = SheypoorGlobalSearchKey;

    // $flow-disable-line
    const url = `https://www.sheypoor.com/${searchCity}?q=${searchQuery}&p=${page}`;

    // TODO: here for checking if there is anymore posts,
    // we can check if there is a 'next page' button or not
    const maxItemsPerPage = 24;
    scrape(url, (results: Array<SheypoorItemsType>) => {
      res.send({
        version: 1.2,
        specifics: {
          sheypoor: {
            noMoreResults: results.length < maxItemsPerPage ? true : false
          }
        },
        results
      });
    });
  })
);

export default route;
