// @flow

import request from "supertest";

import app from "../../src/app";

describe("GET /places", () => {
  it("returns a valid result on a valid request", () => {
    return request(app)
      .get("/places")
      .expect(200)
      .then(res => {
        expect(res.body).toMatchSnapshot();
      });
  });
});
