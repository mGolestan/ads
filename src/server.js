// @flow
import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";

const app = express();
app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use("/", routes);

app.listen(process.env.PORT || 8888);
console.log(`Magic happens on port ${process.env.PORT || "8888"}`);
