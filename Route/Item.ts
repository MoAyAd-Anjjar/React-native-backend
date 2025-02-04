import { randomInt } from "crypto";
import { Router, Request, Response } from "express";
import sqlite3 from "sqlite3";
import { json } from "stream/consumers";
import { ICartType } from "../Types";

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
      // Respond with the randomly selected products
      return res.status(200).json(rows);

    });
  } catch (error: any) {
    console.error("Unexpected error:", error.message);
    return res.status(500).send("An unexpected error occurred");
  }
});



router.post("/CartUpdate", (req: Request, res: Response) => {
  console.log("Request body:", req.body);

  const query = "SELECT * FROM cart WHERE username = ? AND user_id = ?";

  db.all(query, [req.body.username, req.body.user_id], (err, rows: ICartType[]) => {
    if (err) {
      console.error("Error fetching cart items:", err.message);
      return res.status(500).json({ error: "An error occurred while fetching products" });
    }

    if (rows.length === 0) {
      const insertQuery = "INSERT INTO cart (username, user_id, cartList) VALUES (?, ?, ?)";

      // Assuming the cartList is coming from the request body
      const newCartList = JSON.stringify(req.body.cartList || []); // Replace with actual cartList from req.body

      // Use db.run for insert operation
      db.run(insertQuery, [req.body.username, req.body.user_id, newCartList], (err) => {
        if (err) {
          console.error("Error inserting cart items:", err.message);
          return res.status(500).json({ error: "An error occurred while inserting cart" });
        }
        return res.status(201).json({ message: "Cart created successfully" });
      });
      return; // exit early to avoid unnecessary further processing
    }

    // Assuming rows[0].cartList contains the cart items in JSON format
    let updatedCartList: any = rows[0].cartList;

    // Sanitize control characters by removing them or replacing with proper escapes
    updatedCartList = updatedCartList.replace(/[\x00-\x1F\x7F]/g, '');

    try {
      const cartList = JSON.parse(updatedCartList);
      rows[0].cartList = cartList;
      return res.status(200).json(rows[0]); // Return the first row with updated cartList
    } catch (parseError: any) {
      console.error("Error parsing cart list:", parseError.message);
      return res.status(400).json({ error: "Invalid cart list format" });
    }
  });
});


// Route to add a new user



export default router;
