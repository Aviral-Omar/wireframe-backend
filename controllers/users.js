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
  } catch (err) {
    console.log(err);
  }
};

export const getToken = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    res.status(404).end();
  } else {
    const token = jwt.sign(req.body, process.env.SECRET_KEY);
    res.status(200).send(`Bearer ${token}`);
  }
};

export const getName = async (req, res) => {
  let token = req.get("Authorization").split(" ")[1];
  try {
    const { email, password } = jwt.verify(token, process.env.SECRET_KEY);
    const { name } = await User.findOne({ email, password });
    res.status(200).send(name);
  } catch (err) {
    console.log(err);
    res.status(401).end();
  }
};
