import { Router, Request, Response } from "express";
import sqlite3 from "sqlite3";
import { ICartType } from "../Types";

const router: Router = Router();
const db = new sqlite3.Database('./Shop_Mobile_APP.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});
router.post("/GetUserCart", (req: Request, res: Response) => {

    const query = "SELECT * FROM cart WHERE username = ? AND user_id = ?";
    db.all(query, [req.body.username, req.body.user_id], (err, rows: ICartType[]) => {
        if (err) {
            console.error("Error fetching cart items:", err.message);
            return res.status(500).json({ error: "An error occurred while fetching products" });
        }

        if (rows.length === 0) {
            const insertQuery = "INSERT INTO cart (username, user_id, cartList) VALUES (?, ?, ?)";
            db.run(insertQuery, [req.body.username, req.body.user_id, JSON.stringify([])], (err) => {
                if (err) {
                    console.error("Error inserting cart items:", err.message);
                    return res.status(500).json({ error: "An error occurred while inserting cart" });
                }
                return res.status(201).json({ message: "Cart created successfully" }).end();
            });

        }
        else {
            let updatedCartList: any = rows[0].cartList;
            updatedCartList = updatedCartList.replace(/[\x00-\x1F\x7F]/g, '');
            try {
                const cartList = updatedCartList ? JSON.parse(updatedCartList) : [];
                rows[0].cartList = cartList;
                return res.status(200).json(rows[0]); // Return the first row with updated cartList
            } catch (parseError: any) {
                console.error("Error parsing cart list:", parseError.message);
                return res.status(400).json({ error: "Invalid cart list format" });
            }

        }

    })
})

router.put("/CartUpdate", (req: Request, res: Response) => {
    const query = "DELETE FROM cart WHERE username = ? AND user_id = ?";
    db.run(query, [req.body.username, req.body.user_id], (err) => {
        if (err) {
            console.error("Error deleting cart items:", err.message);
            return res.status(500).json({ error: "An error occurred while deleting cart" });
        }
        const insertQuery = "INSERT INTO cart (username, user_id, cartList) VALUES (?, ?,?)";
        db.run(insertQuery, [req.body.username, req.body.user_id, JSON.stringify(req.body.cartList)], (err) => {
            if (err) {
                console.error("Error inserting cart items:", err.message);
                return res.status(500).json({ error: "An error occurred while inserting cart" });
            }
            return res.status(201).json({ message: "Cart updated successfully" }).end();
        })
    })
    console.log(req.body);
    
})

export default router;
