require("dotenv").config()
const { MongoClient } = require("mongodb")

function getDatabaseName(uri) {
    if (process.env.MONGO_DB_NAME) {
        return process.env.MONGO_DB_NAME
    }

    if (!uri) {
        return "testdb"
    }

    try {
        const databaseNameFromUri = new URL(uri).pathname.replace(/^\//, "")

        if (databaseNameFromUri) {
            return decodeURIComponent(databaseNameFromUri)
        }
    } catch (error) {
        console.warn("Unable to parse database name from MONGO_URI. Falling back to testdb.")
    }

    return "testdb"
}

async function deleteAllPosts () {
    const uri = process.env.MONGO_URI
    const client = new MongoClient(uri)
    await client.connect()
    const db = client.db(getDatabaseName(uri))
    const result = await db.collection("posts").deleteMany({})
    console.log(`Deleted ${result.deletedCount} posts.`)
    await client.close()
}

deleteAllPosts()