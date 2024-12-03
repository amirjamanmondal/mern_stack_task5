function Logout(req, res, next) {
  try {
    if (!req.isAuthenticated()) {
      return res.send({ message: "Please login..." });
    }

    req.logOut((error) => {
      if (err) {
        return next(error);
      }
      res.send({ message: "Logout Successfully" });
    });
  } catch (error) {
    res.status(500).send("internal server error during logout", error.message);
  }
}

export default Logout;
