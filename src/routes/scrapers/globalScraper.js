// @flow
import { Router as router } from "express";
import { wrap } from "async-middleware";

const route = router();

route.get(
  "/",
  wrap((req: express$Request, res: express$Response) => {
    const { city, q } = req.query;

    // $flow-disable-line
    const urlQueries = `?city=${city}&q=${q}`;

    const scrapersUrl = {
      Divar: `http://${req.headers.host}/scrape/divar${urlQueries}`,
      Sheypoor: `http://${req.headers.host}/scrape/sheypoor${urlQueries}`
    };

    res.send(scrapersUrl);
  })
);

export default route;
