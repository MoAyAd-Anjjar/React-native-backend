import { randomInt } from "crypto";
import { Router, Request, Response } from "express";
import sqlite3 from "sqlite3";

const router: Router = Router();
const db = new sqlite3.Database('./Shop_Mobile_APP.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Route to get users
router.get("/GetProductsRandom", async (req: any, res: any) => {
  const query = `SELECT * FROM product ORDER BY RANDOM() LIMIT 8`;

  try {
    // Query to get 8 random products
    db.all(query, [], (err, rows) => {
      if (err) {
        console.error("Error fetching random products:", err.message);
        return res.status(500).send("An error occurred while fetching products");
      }

      // Respond with the randomly selected products
      return res.status(200).json(rows);
    });
  } catch (error: any) {
    console.error("Unexpected error:", error.message);
    return res.status(500).send("An unexpected error occurred");
  }
});
router.get("/GetProducts", async (req: Request, res: any) => {
  var query = ""
  var Category
  if (req.query.Category) {
    Category = req.query.Category;
    query = `SELECT * FROM product WHERE productcategory=?`;
  }
  else
    query = `SELECT * FROM product `;
  try {
    // Query to get 8 random products
    db.all(query, [Category], (err, rows) => {
      if (err) {
        console.error("Error fetching random products:", err.message);
        return res.status(500).send("An error occurred while fetching products");
      }

      console.log(rows);
      // Respond with the randomly selected products
      return res.status(200).json(rows);

    });
  } catch (error: any) {
    console.error("Unexpected error:", error.message);
    return res.status(500).send("An unexpected error occurred");
  }
});


// Route to add a new user



export default router;
