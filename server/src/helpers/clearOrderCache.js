const redis = require('../config/redis.config')

const clearOrderCaches = async (orderId, userId) => {
  const keys = [
    orderId ? `order:${orderId}` : null,
    userId ? `orders:user:${userId}` : null,
    "admin:orders:all",
  ].filter(Boolean);

  await Promise.all(keys.map((key) => redis.del(key)));
};

module.exports = { clearOrderCaches };
