import jwt from "jsonwebtoken";
import MetricsPool from "../util/metrics_pool.js";

import Metric from "../models/metric.js";

export const getMetricsCount = async (req, res) => {
  try {
    let token = req.get("Authorization").split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY);
  } catch {
    return res.status(401).end();
  }
  try {
    const metricsCount = await Metric.find().estimatedDocumentCount();
    res.status(200).json(metricsCount);
  } catch {
    res.status(502).end();
  }
};

export const getMetrics = async (req, res) => {
  try {
    let token = req.get("Authorization").split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY);
  } catch {
    return res.status(401).end();
  }
  const page = +req.query.page;
  const pageSize = +req.query.page_size;
  try {
    const metrics = await Metric.find()
      .limit(pageSize)
      .skip((page - 1) * pageSize);
    res.status(200).json(metrics);
  } catch {
    res.status(502).end();
  }
};

export const getTSData = async (req, res) => {
  try {
    let token = req.get("Authorization").split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY);
  } catch {
    return res.status(401).end();
  }
  const ids = req.body;
  const data = [];
  for (let id of ids) {
    const query = `SELECT * FROM ts_${id} WHERE timestamp >= '2021-06-01T00:00:00.000Z' ORDER BY timestamp DESC`;
    try {
      const tsData = await MetricsPool.query(query);
      data.push(tsData);
    } catch {
      return res.status(502).end();
    }
  }
  res.status(200).json(data);
};
