import jwt from "jsonwebtoken";
import StreamsPool from "../util/streams_pool.js";
import mongoose from "mongoose";

import Stream from "../models/stream.js";

export const getStreams = async (req, res, next) => {
  try {
    let token = req.get("Authorization").split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY);
  } catch {
    return res.status(401).end();
  }
  try {
    if (Object.keys(req.query).length !== 0) {
      return next();
    }
    const streams = await Stream.find();
    res.status(200).json(streams);
  } catch {
    res.status(502).end();
  }
};

export const getStreamTable = async (req, res) => {
  const { id } = req.query;
  const query = `SELECT * FROM public.stream_table_${id} LIMIT 100`;
  try {
    const streamTable = await StreamsPool.query(query);
    res.status(200).json(streamTable);
  } catch {
    res.status(502).end();
  }
};

export const postStreamById = async (req, res) => {
  try {
    let token = req.get("Authorization").split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY);
  } catch {
    return res.status(401).end();
  }
  const { id } = req.body;
  try {
    const stream = await Stream.findOne({
      "source._id": mongoose.Types.ObjectId(id),
    });
    res.status(200).json(stream);
  } catch {
    res.status(502).end();
  }
};
