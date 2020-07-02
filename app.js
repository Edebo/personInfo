import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import helmet from "helmet";
import personRoute from "./route/person";
import "dotenv/config";

const app = express();


//security middleware:setting http headers
app.use(helmet());

//set static folder
app.use(express.static(path.join(__dirname, "public")));
//making the uploads folder publicly available
app.use(cors());
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
// // parse application/json
//app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/v1/state",personRoute)

app.use("/", (req, res) => {
  res.send("oops page not found");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server started successufully");
});