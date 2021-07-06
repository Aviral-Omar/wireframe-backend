import express from "express";

import { getStreams, getStreamTable } from "../controllers/streams.js";

const router = express.Router();

router.get("/streams", getStreams, getStreamTable);

export default router;
