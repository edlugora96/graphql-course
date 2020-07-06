const MongoClient = require("mongodb").MongoClient

let connection
async function connectDB() {
  if (connection) return connection
  let client
  try {
    client = await MongoClient.connect(process.env.DB_URI, {
      useNewUrlParser: true,
    })
    connection = client.db("gora_db")
  } catch {
    console.error(error)
    process.exit(1)
  }
  return connection
}

module.exports = connectDB
