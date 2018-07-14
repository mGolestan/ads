// @flow
import { InternalServerError } from "../utils/errors";

const errResponse = () => {
  throw new InternalServerError("Internal Error");
};

export default errResponse;
