// @flow
import { Router as router } from "express";
import { wrap } from "async-middleware";
import urlencode from "urlencode";
import scrape from "./scrap";

const route = router();

// Let's scrape Sheypoor
route.get(
  "/",
  wrap((req: express$Request, res: express$Response) => {
    // search query
    const searchQuery = urlencode(req.query.q);

    // serch location (proviances)
    let searchLocation;
    req.query.location
      ? (searchLocation = urlencode(req.query.location))
      : (searchLocation = "search");

    const url = `https://www.sheypoor.com/${searchLocation}?q=${searchQuery}`;

    scrape(url, results => {
      res.send(results);
    });
  })
);

export default route;
