// @flow
import { BadRequest } from "../utils/errors";
import { Place } from "../utils/places";

const scrape = (
  req: express$Request,
  res: express$Response,
  next: express$NextFunction
) => {
  if (!req.query.q) {
    throw new BadRequest("q parameter is required");
  }
  if (!req.query.city) {
    throw new BadRequest("city parameter is required");
  }
  if (!Place.findByCitySlug(req.query.city)) {
    throw new BadRequest("entered city is not supported");
  }

  next();
};

export default scrape;
