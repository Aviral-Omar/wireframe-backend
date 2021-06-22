import User from "../models/user.js";

const postAddUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await User.create({ name, email, password });
    res.status(201).end();
  } catch (err) {
    console.log(err);
  }
};

export default postAddUser;
