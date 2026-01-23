import express, { json } from "express";
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
const categoryRoutes = new CategoryRouter(categoryController)

app.use("/api/v1/users", userRoutes.router)
app.use("/api/v1/categories", categoryRoutes.router)

