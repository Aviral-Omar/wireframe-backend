import express from "express";

import { getMetrics, getTSData } from "../controllers/metrics.js";

const router = express.Router();

router.get("/metrics", getMetrics);

router.post("/metrics", getTSData);

export default router;
