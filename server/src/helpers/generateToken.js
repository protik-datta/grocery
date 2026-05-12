const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const setAuthCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

const clearAuthCookie = (res) => {
  res.clearCookie("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
};

module.exports = { generateToken, setAuthCookie, clearAuthCookie };
