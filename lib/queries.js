const connectDb = require("./db")
module.exports = {
  getAnimes: async () => {
    let db,
      animes = []
    try {
      db = await connectDb()
      animes = await db.collection("animes").find().toArray()
    } catch (error) {
      console.error(error)
    }
    return animes
  },
  getAnime: async (root, args) => {
    let db, anime
    try {
      db = await connectDb()
      anime = await db.collection("animes").findOne({ name: args.name })
    } catch (error) {
      console.error(error)
    }
    return anime
  },
}
