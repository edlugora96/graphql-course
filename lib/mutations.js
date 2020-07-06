const connectDb = require("./db")
module.exports = {
  createAnime: async (root, { input }) => {
    let db, anime
    try {
      db = await connectDb()
      anime = await db.collection("animes").insertOne(input)
      input._id = anime.insertedId
    } catch (error) {
      console.error(error)
    }
    return input
  },
}
