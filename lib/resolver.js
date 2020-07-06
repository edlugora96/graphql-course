const animes = [
  {
    _id: 0,
    name: "Naruto",
    description: "Great",
  },
  {
    _id: 1,
    name: "Boruto",
    description: "Great - 2",
  },
  {
    _id: 2,
    name: "Bleach",
    description: "Great - 3",
  },
]

module.exports = {
  hello: () => "Hola Mundo",
  great: () => "Hi World",
  getAnimes: () => animes,
}
