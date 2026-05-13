const extractPublicId = (secureUrl) => {
  const parts = secureUrl.split("/");
  const fileWithExt = parts[parts.length - 1];
  const folder = parts[parts.length - 2];
  const publicId = fileWithExt.split(".")[0];
  return /^v\d+$/.test(folder) ? publicId : `${folder}/${publicId}`;
};

module.exports = { extractPublicId };
