import jwt from "jsonwebtoken";

import Stream from "../models/stream.js";

export const getStreams = async (req, res) => {
  let token = req.get("Authorization").split(" ")[1];
  try {
    jwt.verify(token, process.env.SECRET_KEY);
    const streams = await Stream.find();
    res.status(200).json(streams);
  } catch {
    res.status(401).end();
  }
};
