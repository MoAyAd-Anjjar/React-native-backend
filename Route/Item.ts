import { randomInt } from "crypto";
import { Router, Request, Response } from "express";
import Database from "better-sqlite3";
import { ICartType } from "../Types";

const router: Router = Router();
const db = new Database("./Shop_Mobile_APP.db");

// Route to get 8 random products
router.get("/GetProductsRandom", async (req: Request, res: any) => {
  const query = `SELECT * FROM product ORDER BY RANDOM() LIMIT 8`;

  try {
    const rows = db.prepare(query).all();
    return res.status(200).json(rows);
  } catch (error: any) {
    console.error("Unexpected error:", error.message);
    return res.status(500).send("An unexpected error occurred");
  }
});

// Route to get products by category
router.get("/GetProducts", async (req: Request, res: any) => {
  let query = "";
  let Category = req.query.Category;

  if (Category) {
    query = `SELECT * FROM product WHERE productcategory=?`;
  } else {
    query = `SELECT * FROM product`;
  }

  try {
    const stmt = db.prepare(query);
    const rows = Category ? stmt.all(Category) : stmt.all();

    return res.status(200).json(rows);
  } catch (error: any) {
    console.error("Unexpected error:", error.message);
    return res.status(500).send("An unexpected error occurred");
  }
});




export default router;
