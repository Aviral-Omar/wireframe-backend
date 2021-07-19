import MetricsPool from "../util/metrics_pool.js";

import Metric from "../models/metric.js";

export const postMetricsCount = async (req, res) => {
  const filters = req.body;
  const query = Object.entries(filters).flatMap((entry) =>
    entry[1].length
      ? [
          {
            $elemMatch: { name: entry[0], value: { $in: entry[1] } },
          },
        ]
      : []
  );

  try {
    const metricsCount = await Metric.countDocuments(
      query.length
        ? {
            "_source.dimensions": {
              $all: query,
            },
          }
        : {}
    );
    res.status(200).json(metricsCount);
  } catch {
    res.status(502).end();
  }
};

export const postMetrics = async (req, res, next) => {
  if (!Object.keys(req.query).length) {
    return next();
  }

  const page = +req.query.page;
  const pageSize = +req.query.page_size;
  const filters = req.body;
  const query = Object.entries(filters).flatMap((entry) =>
    entry[1].length
      ? [
          {
            $elemMatch: { name: entry[0], value: { $in: entry[1] } },
          },
        ]
      : []
  );
  try {
    const metrics = await Metric.find(
      query.length
        ? {
            "_source.dimensions": {
              $all: query,
            },
          }
        : {}
    )
      .limit(pageSize)
      .skip((page - 1) * pageSize);
    res.status(200).json(metrics);
  } catch {
    res.status(502).end();
  }
};

export const postTSData = async (req, res) => {
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
