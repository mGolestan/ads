// @flow

import request from "supertest";

import app from "../../src/app";

describe("GET /scrape/divar", () => {
  it(
    "returns a valid result on a valid request",
    () => {
      const city = "tehran";
      const q = "میز";
      return request(app)
        .get(`/scrape/divar?city=${city}&q=${q}`)
        .expect(200);
    },
    10000
  );

  it("returns BadRequest on an invalid city", () => {
    const city = "";
    const q = "میز";
    return request(app)
      .get(`/scrape/divar?city=${city}&q=${q}`)
      .expect(400);
  });

  it("returns BadRequest on an invalid q parameter", () => {
    const city = "terhan";
    const q = "";
    return request(app)
      .get(`/scrape/divar?city=${city}&q=${q}`)
      .expect(400);
  });

  it("returns BadRequest if not entered url querys", () => {
    return request(app)
      .get(`/scrape/divar`)
      .expect(400);
  });
});
