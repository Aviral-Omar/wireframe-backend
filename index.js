import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/users.js";
import streamRoutes from "./routes/streams.js";
import metricRoutes from "./routes/metrics.js";

const MONGODB_URI =
  "mongodb+srv://NoSQLB:LR5qFD9uhGRfYj4O@cluster0.uslcv.mongodb.net/wireframe?retryWrites=true&w=majority";

dotenv.config();

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(userRoutes);
app.use(streamRoutes);
app.use(metricRoutes);

let port = process.env.PORT;
if (port == null || port === "") {
  port = 8080;
}

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(port);
  });
