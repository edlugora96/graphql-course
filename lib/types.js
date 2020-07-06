const connectDb = require("./db")
const { ObjectID } = require("mongodb")
const errorHandler = require("./errorHandler")
module.exports = {
  Anime: {
    authors: async ({ authors }) => {
      let authorData, ids
      try {
        db = await connectDb()
        ids = authors ? authors.map(id => ObjectID(id)) : []
        authorData =
          ids.length > 0
            ? await db
                .collection("authors")
                .find({ _id: { $in: ids } })
                .toArray()
            : []
      } catch (error) {
        errorHandler(error)
      }
      return authorData
    },
  },
}
