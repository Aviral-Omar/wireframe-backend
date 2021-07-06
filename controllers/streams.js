import jwt from "jsonwebtoken";
import StreamsClient from "../util/streams_client.js";

import Stream from "../models/stream.js";

export const getStreams = async (req, res, next) => {
  let token = req.get("Authorization").split(" ")[1];
  try {
    jwt.verify(token, process.env.SECRET_KEY);
    if (Object.keys(req.query).length !== 0) {
      return next();
    }
    const streams = await Stream.find();
    res.status(200).json(streams);
  } catch {
    res.status(401).end();
  }
};

export const getStreamTable = async (req, res) => {
  const { id } = req.query;
  console.log(id);
  const query = `SELECT * FROM public.stream_table_${id} LIMIT 100`;
  try {
    const streamTable = await StreamsClient.query(query);
    console.log(streamTable);
    StreamsClient.end();
    res.status(200).json(streamTable);
  } catch {
    res.status(502).end();
  }
};
