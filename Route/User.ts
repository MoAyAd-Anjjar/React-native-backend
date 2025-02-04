import { Router, Request, Response } from "express";
import Database from "better-sqlite3";

const router: Router = Router();
const db = new Database("./Shop_Mobile_APP.db");

// Route to get users
router.get("/GetUser", (req: Request, res: any) => {
  const { username, password, email } = req.query;

  try {
    const query = db.prepare(
      "SELECT * FROM Users WHERE username = ? AND email = ? AND password = ?"
    );
    const users = query.all(username, email, password);
   
    
    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(...users);
  } catch (error: any) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "An error occurred while fetching users" });
  }
});

// Route to get user cart
router.get("/GetUserCart", (req: Request, res: any) => {
  const { USER_NAME, USER_ID } = req.query;

  try {
    const query = db.prepare("SELECT * FROM cart WHERE username = ? AND user_id = ?");
    const cartItems = query.all(USER_NAME, USER_ID);

    if (cartItems.length === 0) {
      return res.status(404).json({ message: "No items found in the cart" });
    }

    res.status(200).json(cartItems);
  } catch (error: any) {
    console.error("Error fetching user cart:", error.message);
    res.status(500).json({ error: "An error occurred while fetching user cart" });
  }
});

export default router;
