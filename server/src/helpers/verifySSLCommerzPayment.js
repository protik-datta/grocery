const crypto = require('crypto')

const verifySSLCommerzPayment = (postData, storePassword) => {
  const receivedHash = postData.verify_sign;
  const receivedKey = postData.verify_key;

  if (!receivedHash || !receivedKey) return false;

  const keys = receivedKey.split(",");
  const sortedData = {};

  keys.forEach((key) => {
    sortedData[key] = postData[key] || "";
  });

  sortedData["store_passwd"] = crypto
    .createHash("md5")
    .update(storePassword)
    .digest("hex");

  const sortedKeys = Object.keys(sortedData).sort();
  const hashString = sortedKeys.map((k) => `${k}=${sortedData[k]}`).join("&");

  const generatedHash = crypto
    .createHash("md5")
    .update(hashString)
    .digest("hex");

  return generatedHash === receivedHash;
};

module.exports = { verifySSLCommerzPayment };
