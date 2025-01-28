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
router.get("/GetUser", async (req: Request, res: Response) => {
  const username=req.query.username;
    const password= req.query.password;
    const email= req.query.email;
  console.log( password, email, username);
   

    try {
        const query = `SELECT * FROM Users  WHERE username=? OR email=? AND password=?`;

        db.all(query, [username,email,password], (err, rows) => {
            if (err) {
                console.error("Error fetching users:", err.message);
                res.status(500).send("An error occurred while fetching users");
                return rows;
            }
           
            res.status(200).json(...rows);
        });
    } catch (error: any) {
        console.error("Error fetching users:", error.message);
        res.status(500).send("An error occurred while fetching users");
    }
});

// Route to add a new user



export default router;
