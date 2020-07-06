const connectDb = require("./db")
const { ObjectID } = require("mongodb")
const errorHandler = require("./errorHandler")

module.exports = {
  getAnimes: async () => {
    let db,
      animes = []
    try {
      db = await connectDb()
      animes = await db.collection("animes").find().toArray()
    } catch (error) {
      errorHandler(error)
    }
    return animes
  },
  getAnime: async (root, args) => {
    let db, anime
    try {
      db = await connectDb()
      anime = await db.collection("animes").findOne({ name: args.name })
    } catch (error) {
      errorHandler(error)
    }
    return anime
  },
  getAuthors: async () => {
    let db,
      authors = []
    try {
      db = await connectDb()
      authors = await db.collection("authors").find().toArray()
    } catch (error) {
      errorHandler(error)
    }
    return authors
  },
  getAuthor: async (root, { id }) => {
    let db, author
    try {
      db = await connectDb()
      author = await db.collection("authors").findOne({ _id: ObjectID(id) })
    } catch (error) {
      errorHandler(error)
    }
    return author
  },
  searchItems: async (root, { keyword }) => {
    let db, animes, authors
    try {
      db = await connectDb()
      animes = await db
        .collection("animes")
        .find({ $text: { $search: keyword } })
        .toArray()
      authors = await db
        .collection("authors")
        .find({ $text: { $search: keyword } })
        .toArray()
      console.log(animes, authors)
    } catch (error) {
      errorHandler(error)
    }
    return [...animes, ...authors]
  },
}
