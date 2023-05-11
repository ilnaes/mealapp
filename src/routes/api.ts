import express from "express";
import { clean } from "../utils";
import { mongo_uri } from "../../config";
import { MongoClient } from "mongodb";

const client = new MongoClient(mongo_uri);
const api = express();

api.post("/meal", async (req, res) => {
  const meal = clean(req.body.user, req.body);

  if (meal === null) {
    res.status(400).send("BAD!");
    return;
  }

  const conn = await client.connect();
  const timestamp = conn.db("mealapp").collection("timestamps");

  try {
    // unique index so could throw error
    await timestamp.insertOne(meal);
  } catch (err) {
    res.status(400).send("Already exists!");
    return;
  }
  res.send("OK!");
});

api.get("/meals", async (req, res) => {
  const user = "asd";
  const conn = await client.connect();
  const timestamp = conn.db("mealapp").collection("timestamps");

  const cursor = timestamp
    .find({ user })
    .sort({ ts_meal: -1 })
    .limit(req.body.limit);

  res.json(await cursor.toArray());
});

api.delete("/meal", async (req, res) => {
  const meal = clean(req.body.user, req.body, false);

  if (meal === null) {
    res.status(400).send("BAD!");
    return;
  }

  const conn = await client.connect();
  const timestamp = conn.db("mealapp").collection("timestamps");

  const result = await timestamp.deleteOne(meal);

  if (result.deletedCount == 0) {
    res.send("Didn't exist!");
  } else {
    res.send("Ok!");
  }
});

export = api;
