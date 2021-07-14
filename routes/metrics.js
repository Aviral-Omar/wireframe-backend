import express from "express";

import {
  getMetrics,
  getTSData,
  getMetricsCount,
} from "../controllers/metrics.js";

const router = express.Router();

router.get("/metrics/count", getMetricsCount);

router.get("/metrics", getMetrics);

router.post("/metrics", getTSData);

export default router;
