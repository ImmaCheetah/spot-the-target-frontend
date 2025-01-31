export default function normalizeCoords(userX, userY, imageWidth, imageHeight, origImageWidth, origImageHeight) {
  const normX = (userX / imageWidth) * origImageWidth
  const normY = (userY / imageHeight) * origImageHeight

  return {normX, normY}
}