function errorHandler(error) {
  console.error(error)
  throw new Error("Ups! There was a error")
}
module.exports = errorHandler
