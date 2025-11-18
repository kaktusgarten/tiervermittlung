import "#db";
import express from "express";
import { errorHandler } from "#middlewares";
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;

//Middleware
app.use(express.json());
app.use(cookieParser());

//Routes

//Error Handling
app.use(errorHandler);

//Start Server
app.listen(port, () =>
  console.log(
    `🐦‍🔥 \x1b[34mServer is running on http://localhost:${port}\x1b[0m 🐦‍🔥`
  )
);
