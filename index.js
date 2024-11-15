import express from "express";
import bodyParser from "body-parser";
import { connectDb } from "./db.js";
import { model, Schema } from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3001;

const product = new Schema({
  name: { type: String },
  location: { type: String },
});

const productModel = model("product", product);

app.get("/", async (req, res) => {
  try {
    let data = await productModel.find({});
    res.status(200).json(data.rows);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post("/", async (req, res) => {
  try {
    const { name, location } = req.body;
    await productModel.create({ name, location });
    res.status(200).json({ massage: "Data saved Successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

connectDb()
  .then(() => {
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server Running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(`Server connection failed with error /n ${err}`);
  });
