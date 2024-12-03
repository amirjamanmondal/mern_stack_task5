import User from "../models/UserModel";

function FethcInfo(req, res) {
  try {
    if (!req.isAuthenticated()) {
      return res.send({ message: "Please login..." });
    }
    const user = req.user;
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json(error.message);
  }
}

export default FethcInfo;