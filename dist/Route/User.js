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
router.get("/GetUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.query.username;
    const password = req.query.password;
    const email = req.query.email;
    try {
        const query = `SELECT * FROM Users  WHERE username=? AND email=? AND password=?`;
        db.all(query, [username, email, password], (err, rows) => {
            if (err) {
                console.error("Error fetching users:", err.message);
                res.status(500).send("An error occurred while fetching users");
                return rows;
            }
            res.status(200).json(...rows);
        });
    }
    catch (error) {
        console.error("Error fetching users:", error.message);
        res.status(500).send("An error occurred while fetching users");
    }
}));
router.get('/GetUserCart', (req, res) => {
    const USER_NAME = req.query.USER_NAME;
    const USER_ID = req.query.USER_ID;
    try {
        const query = `SELECT * FROM cart  WHERE username=? AND userid=?`;
        db.all(query, [USER_NAME, USER_ID], (err, rows) => {
            if (err) {
                console.error("Error fetching users:", err.message);
                res.status(500).send("An error occurred while fetching users");
            }
            res.status(200).json(...rows);
        });
    }
    catch (error) {
        console.error("Error fetching users:", error.message);
        res.status(500).send("An error occurred while fetching users");
    }
});
// Route to add a new user
exports.default = router;
