// @flow
import { Router as router } from "express";
import { wrap } from "async-middleware";
import loadEnv from "../../utils/loadEnv";

const route = router();

route.get(
  "/",
  wrap((req: express$Request, res: express$Response) => {
    const { city, q } = req.query;

    // $flow-disable-line
    const urlQueries = `?city=${city}&q=${q}`;

    const scrapersUrl = {
      currentPage: 1,
      scrapers: []
    };

    if (loadEnv("DIVAR_SCRAPER_ENABLED") === "true") {
      scrapersUrl.scrapers.push({
        name: "Divar",
        url: `http://${req.headers.host}/scrape/divar${urlQueries}`,
        method: "get"
      });
    }

    if (loadEnv("SHEYPOOR_SCRAPER_ENABLED") === "true") {
      scrapersUrl.scrapers.push({
        name: "Sheypoor",
        url: `http://${req.headers.host}/scrape/sheypoor${urlQueries}`,
        method: "get"
      });
    }

    res.send(scrapersUrl);
  })
);

export default route;
