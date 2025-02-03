export default function normalizeCoords(userX, userY, imageWidth, imageHeight, origImageWidth, origImageHeight) {
  const normX = (userX / imageWidth) * origImageWidth
  const normY = (userY / imageHeight) * origImageHeight

  return {normX, normY}
}

export function standardCoords(targetX, targetY, origImageWidth, origImageHeight, imageWidth, imageHeight) {
  const standardX = (targetX / origImageWidth) * imageWidth
  const standardY = (targetY / origImageHeight) * imageHeight

  return {standardX, standardY}
}
