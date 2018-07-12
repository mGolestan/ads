// @flow

import request from "supertest";

import app from "../../src/app";

describe("GET /scrape/sheypoor", () => {
  it("returns a valid result on a valid request", () => {
    const city = "tehran";
    const q = "میز";
    return request(app)
      .get(`/scrape/sheypoor?city=${city}&q=${q}`)
      .expect(200)
      .then(res => {
        expect(res.body).toMatchSnapshot();
      });
  });

  it("returns BadRequest on an invalid city", () => {
    const city = "";
    const q = "میز";
    return request(app)
      .get(`/scrape/sheypoor?city=${city}&q=${q}`)
      .expect(400);
  });

  it("returns BadRequest on an invalid q parameter", () => {
    const city = "terhan";
    const q = "";
    return request(app)
      .get(`/scrape/sheypoor?city=${city}&q=${q}`)
      .expect(400);
  });

  it("returns BadRequest if not entered url querys", () => {
    return request(app)
      .get(`/scrape/sheypoor`)
      .expect(400);
  });
});
