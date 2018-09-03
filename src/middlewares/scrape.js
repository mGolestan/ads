// @flow
import { BadRequest } from "../utils/errors";
import { Place } from "../utils/places";

const scrape = (
  req: express$Request,
  res: express$Response,
  next: express$NextFunction
) => {
  if (!req.query.q && !req.body.q) {
    throw new BadRequest("q parameter is required");
  }
  if (!req.query.city && !req.body.city) {
    throw new BadRequest("city parameter is required");
  }

  const city = req.query.city ? req.query.city : req.body.city && req.body.city;
  if (!Place.findByCitySlug(city)) {
    throw new BadRequest("entered city is not supported");
  }

  next();
};

export default scrape;
