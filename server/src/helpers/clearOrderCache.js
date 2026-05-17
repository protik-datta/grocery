const redis = require("../config/redis.config");

const clearOrderCaches = async (orderId, userId) => {
  const keysToDelete = [];

  if (orderId) {
    keysToDelete.push(`order:${orderId}`);
  }

  if (userId) {
    keysToDelete.push(`orders:user:${userId}`);
  }

  keysToDelete.push("admin:orders:all");

  if (keysToDelete.length > 0) {
    await redis.del(keysToDelete);
  }
};

module.exports = { clearOrderCaches };
