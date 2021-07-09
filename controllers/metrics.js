import jwt from "jsonwebtoken";
import MetricsPool from "../util/metrics_pool.js";

import Metric from "../models/metric.js";

export const getMetrics = async (req, res) => {
  let token = req.get("Authorization").split(" ")[1];
  try {
    jwt.verify(token, process.env.SECRET_KEY);
    const metrics = await Metric.find();
    res.status(200).json(metrics);
  } catch {
    res.status(401).end();
  }
};

export const getTSData = async (req, res) => {
  let token = req.get("Authorization").split(" ")[1];
  try {
    jwt.verify(token, process.env.SECRET_KEY);
    const ids = req.body;
    const data = [];
    for (let id of ids) {
      const query = `SELECT * FROM public.ts_${id} LIMIT 100`;
      try {
        const tsData = await MetricsPool.query(query);
        data.push(tsData);
      } catch (e) {
        console.log(e);
        return res.status(502).end();
      }
    }
    res.status(200).json(data);
  } catch {
    res.status(401).end();
  }
};
