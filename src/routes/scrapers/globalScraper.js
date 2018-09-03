// @flow
import { Router as router } from "express";
import { wrap } from "async-middleware";
import loadEnv from "../../utils/loadEnv";

type RequestWithScrapeBodyType = express$Request & {
  body: {
    city: string,
    q: string,
    page?: number,
    specifics?: { [string]: { [string]: any } } // eslint-disable-line flowtype/no-weak-types
  }
};

const route = router();

route.post(
  "/",
  wrap((req: RequestWithScrapeBodyType, res: express$Response) => {
    const { city, q, page, specifics } = req.body;

    let urlQueries = `?city=${city}&q=${q}`;

    const scrapersUrl = {
      page: page ? page : 1,
      scrapers: []
    };

    if (loadEnv("DIVAR_SCRAPER_ENABLED") === "true") {
      if (specifics && specifics.divar && specifics.divar.lastPostDate)
        urlQueries += `&lastPostDate=${specifics.divar.lastPostDate}`;
      scrapersUrl.scrapers.push({
        name: "Divar",
        url: `${loadEnv("BASE_URL")}/scrape/divar${urlQueries}`,
        method: "get"
      });
    }

    if (loadEnv("SHEYPOOR_SCRAPER_ENABLED") === "true") {
      if (page) urlQueries += `&page=${page}`;
      scrapersUrl.scrapers.push({
        name: "Sheypoor",
        url: `${loadEnv("BASE_URL")}/scrape/sheypoor${urlQueries}`,
        method: "get"
      });
    }

    res.send(scrapersUrl);
  })
);

export default route;
