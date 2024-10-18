export function isImageURL(url) {
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];
  const lowercasedUrl = url.toLowerCase();

  return imageExtensions.some((extension) =>
    lowercasedUrl.endsWith(`.${extension}`)
  );
}
