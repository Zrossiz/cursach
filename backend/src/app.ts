import express from "express";
import cookieParser from "cookie-parser";
import UserRouter from "./routes/user";
import UserRepository from "./repository/user";
import prismaClient from "./db/prisma";
import UserService from "./service/user";
import { Config } from "./config/index";
import UserController from "./controller/user";
import winston from "winston";
import CategoryRepository from "./repository/category";
import CategoryService from "./service/category";
import CategoryController from "./controller/category";
import CategoryRouter from "./routes/category";
import GoodRepository from "./repository/good";
import GoodService from "./service/good";
import GoodController from "./controller/good";
import GoodRouter from "./routes/good";
import CardRepository from "./repository/card";
import CardService from "./service/card";
import CardController from "./controller/card";
import CardRouter from "./routes/card";

export const app = express();
app.use(cookieParser());
app.use(express.json()); 

export const cfg = new Config();
export const log = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
  ],
});


const userRepo = new UserRepository(prismaClient);
const userService = new UserService(userRepo, cfg);
const userController = new UserController(userService, log);
const userRoutes = new UserRouter(userController)

const categoryRepo = new CategoryRepository(prismaClient);
const categoryService = new CategoryService(categoryRepo)
const categoryController = new CategoryController(categoryService, log)
const categoryRoutes = new CategoryRouter(categoryController, cfg.JWT_SECRET)

const goodRepo = new GoodRepository(prismaClient);
const goodService = new GoodService(goodRepo);
const goodController = new GoodController(goodService, log);
const goodRouter = new GoodRouter(goodController, cfg.JWT_SECRET);

const cardRepo = new CardRepository(prismaClient);
const cardService = new CardService(cardRepo)
const cardController = new CardController(cardService, log)
const cardRouter = new CardRouter(cardController, cfg.JWT_SECRET)

app.use("/api/v1/users", userRoutes.router);
app.use("/api/v1/categories", categoryRoutes.router);
app.use("/api/v1/goods", goodRouter.router);
app.use("/api/v1/cards", cardRouter.router);
