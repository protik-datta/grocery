const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const AppError = require("../utils/AppError");

const protect = async (req, res, next) => {
  const token = req.cookies.token;

  if(!token) {
    res.status(401).json({
      success: false,
      message: "Not authorized, no token"
    });
    return;
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);

  if(!user) {
    res.status(401).json({
      success: false,
      message: "Not authorized, user not found"
    });
    return;
  }
  req.user = user;
  next();
};

module.exports = {protect};
