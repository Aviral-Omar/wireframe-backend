import express from "express";

import {
  getStreams,
  getStreamTable,
  postStreamById,
} from "../controllers/streams.js";

const router = express.Router();

router.get("/streams", getStreams, getStreamTable);

router.post("/streams", postStreamById);

export default router;
