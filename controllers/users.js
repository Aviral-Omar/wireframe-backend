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
      res.status(302).end();
    }
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    res.status(404).end();
  } else {
    const token = jwt.sign(req.body, process.env.SECRET_KEY);
    res.send(`Bearer ${token}`);
  }
};
