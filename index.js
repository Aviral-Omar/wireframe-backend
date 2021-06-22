import express from "express";
import mongoose from "mongoose";

import userRoutes from "./routes/users.js";

const MONGODB_URI =
  "mongodb+srv://NoSQLB:LR5qFD9uhGRfYj4O@cluster0.uslcv.mongodb.net/wireframe?retryWrites=true&w=majority";

const app = express();

app.use(express.json());

app.use(userRoutes);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    let port = process.env.PORT;
    if (port == null || port === "") {
      port = 3000;
    }
    app.listen(port);
  });
