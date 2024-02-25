import express, { Request, Response } from "express";
import * as dotenv from "dotenv";

require("express-async-errors");

// DB Connections,Middleware,Routes,Swagegr
import cors from "cors";
import rateLimiter from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";

import { connectToPostgres } from "./db/postgres";
import { connectToRedis } from "./db/redis";

import notFoundMiddleware from "./middleware/notFound";
import errorHandlerMiddleware from "./middleware/errorHandler";

import authenticationRouter from "./routers/authentication";
import ingredientsRouter from "./routers/ingredients";
import utensilsRouter from "./routers/utensils";
import usersRouter from "./routers/users";
import recipesRouter from "./routers/recipes";
import dayTemplatesRouter from "./routers/dayTemplates";
import instanceTemplatesRouter from "./routers/instanceTemplates";
import mealPrepLogsRouter from "./routers/mealPrepLogs";

dotenv.config();

const app = express();

app.use(express.raw());
app.use(express.json());

app.use(cors());
app.use(helmet());

app.use(morgan("dev"));

app.set("trust proxy", 1);

// Limit each IP to request a lot in 15 mins
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 1000,
  })
);

const PORT = process.env.PORT || 4000;

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ msg: "Hello" });
});

app.use("/", [
  authenticationRouter,
  ingredientsRouter,
  utensilsRouter,
  usersRouter,
  recipesRouter,
  dayTemplatesRouter,
  instanceTemplatesRouter,
  mealPrepLogsRouter,
]);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const startServer = async () => {
  try {
    await connectToPostgres().then(() => {
      console.log("Connected to Postgres DB!");
    });
    await connectToRedis().then(() => {
      console.log("Connected to Redis DB!");
    });
    app.listen(PORT, () => {
      console.log(`Server is listening on port:${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
