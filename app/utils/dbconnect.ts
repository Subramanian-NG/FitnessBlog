// import { MongoClient, ServerApiVersion } from "mongodb";

// let client;
// let clientPromise: Promise<MongoClient>;

// // const uri = process.env.DB_CONNECTION_STRING;

// const uri = "mongodb+srv://admin:admin@cluster0.53pc9un.mongodb.net/Fitness-Blog";

// if (!uri) {
//     throw new Error("DB connection string not present");
// }

// client = new MongoClient(uri);


// clientPromise = client.connect();

// export default clientPromise;

import { MongoClient, ServerApiVersion } from "mongodb";

let client;
let clientPromise: Promise<MongoClient>;

const uri = "mongodb+srv://admin:admin@cluster0.53pc9un.mongodb.net/Fitness-Blog";

if (!uri) {
    throw new Error("DB connection string not present");
}

client = new MongoClient(uri);

clientPromise = client.connect();

export default clientPromise;
