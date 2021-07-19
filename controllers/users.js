import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const postAddUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      await User.create({ name, email, password });
      res.status(201).end();
    } else {
      res.status(409).end();
    }
  } catch {
    res.status(502).end();
  }
};

export const getToken = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      res.status(404).end();
    } else {
      const token = jwt.sign(req.body, process.env.SECRET_KEY);
      res.status(200).send(`Bearer ${token}`);
    }
  } catch {
    res.status(502).end();
  }
};

export const getName = async (req, res) => {
  let token = req.get("Authorization").split(" ")[1];
  try {
    const { email, password } = jwt.verify(token, process.env.SECRET_KEY);
    try {
      const { name } = await User.findOne({ email, password });
      res.status(200).send(name);
    } catch {
      res.status(502).end();
    }
  } catch {
    res.status(401).end();
  }
};

export const authenticate = (req, res, next) => {
  try {
    let token = req.get("Authorization").split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch {
    return res.status(401).end();
  }
};
