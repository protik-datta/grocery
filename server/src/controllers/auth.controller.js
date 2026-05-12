const asyncHandler = require("../utils/asyncHandler");
const User = require("../model/user.model");
const { generateToken, setAuthCookie, clearAuthCookie } = require("../helpers/generateToken");
const AppError = require("../utils/AppError");
const bcrypt = require("bcryptjs");
const redis = require("../config/redis.config");

// register
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    success: true,
    data: user,
  });
});

// login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const token = generateToken(user._id);
  setAuthCookie(res, token);

  res.status(200).json({
    success: true,
    token,
    data: user,
  });
});

// get me
const getMe = asyncHandler(async (req, res) => {
  const redisKey = `user:${req.user.id}`;

  const cachedUser = await redis.get(redisKey);

  if (cachedUser) {
    return res.status(200).json({
      success: true,
      source: "redis",
      data: JSON.parse(cachedUser),
    });
  }

  const user = await User.findById(req.user.id).lean();

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  await redis.set(redisKey, JSON.stringify(user), "EX", 60 * 60);

  res.status(200).json({
    success: true,
    source: "db",
    data: user,
  });
});

// logout
const logout = asyncHandler(async (req, res) => {
  clearAuthCookie(res);
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

module.exports = {
  register,
  login,
  getMe,
  logout,
};
