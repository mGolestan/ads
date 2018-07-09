// @flow
import { NotFound } from "../utils/errors";

const notFound = (req: express$Request, res: express$Response) => {
  throw new NotFound("Route not found");
};

export default notFound;
