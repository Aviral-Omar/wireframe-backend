import express from "express";

import postAddUser from "../controllers/users.js";

const router = express.Router();

router.post("/sign-up", postAddUser);

export default router;
