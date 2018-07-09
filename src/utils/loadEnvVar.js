import fs from "fs";
import dotenv from "dotenv";

type EnvObjectType = {};

override = (envObj: EnvObjectType) => {
  process.env = { ...process.env, ...envObj };
};

loadEnvVar = () => {
  const enviroment = process.env.NODE_ENV || "development";

  if (enviroment !== "production") {
    dotenv.config();
  }

  if (fs.existsSync(".env.local")) {
    override(dotenv.parse(fs.readFileSync(".env.local")));
  }
};

export default loadEnvVar;
