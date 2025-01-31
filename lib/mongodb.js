import { MongoClient } from "mongodb";

let client;
let clientPromise;

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable in your .env.local file");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// Ensure client is assigned correctly
clientPromise.then((resolvedClient) => {
  client = resolvedClient;
});

export async function connectToDatabase() {
  if (!client) {
    client = await clientPromise;
  }
  const db = client.db(process.env.DB_NAME);
  return { db, client };
}
