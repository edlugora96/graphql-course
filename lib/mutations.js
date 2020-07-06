const connectDb = require("./db")
const errorHandler = require("./errorHandler")
const { ObjectID } = require("mongodb")
module.exports = {
  createAuthor: async (root, { input }) => {
    let db, author
    try {
      db = await connectDb()
      author = await db.collection("authors").insertOne(input)
      input._id = author.insertedId
    } catch (error) {
      errorHandler(error)
    }
    return input
  },
  createAnime: async (root, { input }) => {
    let db, anime
    try {
      db = await connectDb()
      anime = await db.collection("animes").insertOne(input)
      input._id = anime.insertedId
    } catch (error) {
      errorHandler(error)
    }
    return input
  },
  editAnime: async (root, { input, name }) => {
    let db, anime, editedAnime
    try {
      db = await connectDb()
      editedAnime = await db
        .collection("animes")
        .updateOne({ name }, { $set: input })
      anime = await db.collection("animes").findOne({ name: input.name })
    } catch (error) {
      errorHandler(error)
    }
    return anime
  },
  addAuthor: async (root, { animeId, authorId }) => {
    let db, anime, author
    try {
      db = await connectDb()
      anime = await db.collection("animes").findOne({ _id: ObjectID(animeId) })
      author = await db
        .collection("authors")
        .findOne({ _id: ObjectID(authorId) })

      if (!anime || !author)
        throw new Error("The anime or the author not exist")

      await db
        .collection("animes")
        .updateOne(
          { _id: ObjectID(animeId) },
          { $addToSet: { authors: ObjectID(authorId) } },
        )
    } catch (error) {
      errorHandler(error)
    }
    return anime
  },
}
