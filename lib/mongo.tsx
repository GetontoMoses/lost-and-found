"use server";

import mongoose from "mongoose";

const MONGO_URI = process.env.NEXT_PUBLIC_MONGO_URI;
console.log("MONGO_URI", MONGO_URI);

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable"); //ensure the URI exists in the .env
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  /*  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI as string)
      .then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn; */
  try {
    await mongoose.connect(MONGO_URI as string);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

export default connectToDatabase;
