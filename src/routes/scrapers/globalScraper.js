// @flow
import { Router as router } from "express";
import { wrap } from "async-middleware";
import { BadRequest } from "../../utils/errors";
import { Place } from "../../utils/places";

const route = router();

route.get(
  "/",
  wrap((req: express$Request, res: express$Response) => {
    const { city, q } = req.query;

    if (!q) {
      throw new BadRequest("q parameter is required");
    }
    if (!Place.findByCitySlug(city)) {
      throw new BadRequest("entered city is not supported");
    }

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
