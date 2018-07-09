// @flow
import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import { notFound, errResponse } from "./middlewares";

const app = express();
app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use("/", routes)
  .use(notFound)
  .use(errResponse);

app.listen(process.env.PORT || 8080);
console.log(`Magic happens on port ${process.env.PORT || "8080"}`);

module.exports = app;
