import express from "express";
import cookieParser from "cookie-parser";
import swaggerUI from "swagger-ui-express";
import cors from "cors";
import "#db";
import {
  authRoutes,
  postRoutes,
  userRoutes,
  categoryRoutes,
  characteristicRoutes,
  animalRoutes,
  animalformapRoutes,
  messageRoutes,
  ownerformapRoutes,
} from "#routes";
import { errorHandler } from "#middlewares";
import { openapiSpec } from "#docs";

const app = express();
const port = 3000;

// COOKIE & BODY PARSER
app.use(express.json());
app.use(cookieParser());
// laut Stackoverflow wegen multipart/form-data     https://stackoverflow.com/questions/71617579/node-js-req-body-undefined-in-form-data-content-type

//CORS POLICY
// simple version when credentials not needed
// app.use(cors());

// Besser aber geht nicht:
// app.use(
//   cors({
//     origin: [
//       //process.env.CLIENT_BASE_URL!,
//       "http://localhost:5173",
//       "http://localhost:4173",
//       "https://tierglueck-vermittlung.onrender.com"
//     ],
//     credentials: true,
//     exposedHeaders: ["WWW-Authenticate"],
//   })
// );

// Alles erlaubt:
app.use(
  cors({
    origin: true,
    credentials: true,
    exposedHeaders: ["WWW-Authenticate"],
  })
);

// ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/messages", messageRoutes);
app.use("/categories", categoryRoutes);
app.use("/characteristics", characteristicRoutes);
app.use("/animals", animalRoutes);
app.use("/animalsmap", animalformapRoutes);
app.use("/ownerformap", ownerformapRoutes);

// DOCs
app.use("/docs", swaggerUI.serve, swaggerUI.setup(openapiSpec));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`\x1b[35mMain app listening at http://localhost:${port}\x1b`);
  console.log(
    `\x1d[17mSwagger Docs available at:http://localhost:${port}/docs\x1b`
  );
});
