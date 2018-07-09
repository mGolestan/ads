// @flow
import { InternalServerError } from "../utils/errors";

const errResponse = (req: express$Request, res: express$Response) => {
  throw new InternalServerError("Internal Error");
};

export default errResponse;
