export const getAssetsFile = (url) => {
  return new URL(`../assets/images/${url}`, import.meta.url).href
}
export const getAppAssetsFile = (appName) => {
  return new URL(`../apps/${appName}/icon.png`, import.meta.url).href
}