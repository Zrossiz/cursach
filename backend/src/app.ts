import express, { json } from "express";
import cookieParser from "cookie-parser";
import UserRouter from "./routes/user";
import UserRepository from "./repository/user";
import prismaClient from "./db/prisma";
import UserService from "./service/user";
import { Config } from "./config/index";
import UserController from "./controller/user";
import winston from "winston";

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

app.use("/api/v1/users", userRoutes.router)

