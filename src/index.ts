import express from "express";
import api from "./routes/api";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", api);

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});
