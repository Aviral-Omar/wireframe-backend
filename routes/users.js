import express from "express";

import {
  postAddUser,
  getToken,
  getName,
  authenticate,
} from "../controllers/users.js";

const router = express.Router();

router.post("/sign-up", postAddUser);

router.post("/sign-in", getToken);

router.get("/user-name", getName);

router.use(authenticate);

export default router;
