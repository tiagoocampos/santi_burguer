import { Router } from "express";
import { db } from "../database/db.js";
import { products } from "../database/schema.js";

const router = Router();

router.get("/products", async (req, res) => {
  res.send("Hello World");
});

export { router };