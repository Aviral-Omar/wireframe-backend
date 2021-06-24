import express from "express";

import { postAddUser, getUser } from "../controllers/users.js";

const router = express.Router();

router.post("/sign-up", postAddUser);

router.post("/sign-in", getUser);

export default router;
