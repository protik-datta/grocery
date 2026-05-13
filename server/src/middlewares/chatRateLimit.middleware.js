const redis = require("../config/redis.config");
const AppError = require("../utils/AppError");

const LIMIT = 300;
const BLOCK_DURATION = 60 * 60 * 10;

const chatRateLimit = async (req, res, next) => {
  const key = `chat:rateLimit:${req.ip}`;

  const requests = await redis.incr(key);

  if (requests === 1) {
    await redis.expire(key, BLOCK_DURATION);
  }

  if (requests > LIMIT) {
    const ttl = await redis.ttl(key);
    const hoursLeft = Math.ceil(ttl / 3600);
    return next(
      new AppError(
        429,
        `You've reached the ${LIMIT} message limit. Please try again in ${hoursLeft} hour(s).`,
      ),
    );
  }
  
  next();
};

module.exports = chatRateLimit;
