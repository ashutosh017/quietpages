function extractCloudinaryPublicId(url) {
  const parts = url.split("/");
  const uploadIndex = parts.indexOf("upload");
  const publicIdParts = parts.slice(uploadIndex + 1);

  // remove version part if it exists and looks like "v123..."
  if (publicIdParts[0].match(/^v\d+$/)) {
    publicIdParts.shift();
  }

  return publicIdParts.join("/").replace(/\.[^/.]+$/, ""); // remove extension
}

console.log(extractCloudinaryPublicId("https://res.cloudinary.com/dodlda5p7/image/upload/v1749147270/nrgwemmpifeqjotfpwym.png"))
console.log(extractCloudinaryPublicId("res.cloudinary.com/dodlda5p7/image/upload/v1749147270/nrgwemmpifeqjotfpwym.png"))