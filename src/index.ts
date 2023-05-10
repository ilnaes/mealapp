import express from "express";
import { mongo_uri } from "../config";
import { MongoClient } from "mongodb";

const app = express();
const client = new MongoClient(mongo_uri);

app.get("/", async (req, res) => {
  const time = new Date();
  const ts = time.toISOString();

  const conn = await client.connect();
  const timestamps = conn.db("mealapp").collection("timestamps");

  await timestamps.insertOne({ ts });

  res.send(`Hello world! The time is now ${ts}`);
});

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});
