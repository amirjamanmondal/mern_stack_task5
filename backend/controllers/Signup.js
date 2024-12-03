import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import userValidator from "../schemaValidator/user.schemaValidator.js";

async function Signup(req, res) {
  try {
    const { name, username, password } = userValidator.parse(req.body);

    const DuplicateUser = await User.findOne({ username: username });
    if (DuplicateUser) {
      return res
        .status(409)
        .json({ message: "user already Registered. Please Login" });
    }
    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name: name,
      username: username,
      password: hashed,
    });

    if (user) {
      await user.save();
    }
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
}

export default Signup;
