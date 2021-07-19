import express from "express";

import {
  postMetrics,
  postTSData,
  postMetricsCount,
} from "../controllers/metrics.js";

const router = express.Router();

router.post("/metrics/count", postMetricsCount);

router.post("/metrics", postMetrics, postTSData);

export default router;
