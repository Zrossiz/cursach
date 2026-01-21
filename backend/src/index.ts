import express from "express";
import cookieParser from "cookie-parser";

import { router } from "./controller/controller.js";

const app = express();
app.use(cookieParser());

app.use("/api/v1", router);

app.listen(9000, () => {
  console.log("server started on port: ", 9000);
});
