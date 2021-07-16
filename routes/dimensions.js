import express from "express";

import { autoComplete } from "../controllers/dimensions.js";

const router = express.Router();

router.post("/autocomplete", autoComplete);

export default router;
