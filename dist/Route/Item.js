"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sqlite3_1 = __importDefault(require("sqlite3"));
const router = (0, express_1.Router)();
const db = new sqlite3_1.default.Database('./Shop_Mobile_APP.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    }
    else {
        console.log('Connected to the SQLite database.');
    }
});
// Route to get users
router.get("/GetProductsRandom", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    }
    catch (error) {
        console.error("Unexpected error:", error.message);
        return res.status(500).send("An unexpected error occurred");
    }
}));
router.get("/GetProducts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var query = "";
    var Category;
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
    }
    catch (error) {
        console.error("Unexpected error:", error.message);
        return res.status(500).send("An unexpected error occurred");
    }
}));
// Route to add a new user
exports.default = router;
