import express from "express";

import { getStreams } from "../controllers/streams.js";

const router = express.Router();

router.get("/streams", getStreams);

export default router;
