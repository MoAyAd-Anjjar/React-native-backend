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
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const router = (0, express_1.Router)();
const db = new better_sqlite3_1.default("./Shop_Mobile_APP.db");
// Route to get 8 random products
router.get("/GetProductsRandom", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `SELECT * FROM product ORDER BY RANDOM() LIMIT 8`;
    try {
        const rows = db.prepare(query).all();
        return res.status(200).json(rows);
    }
    catch (error) {
        console.error("Unexpected error:", error.message);
        return res.status(500).send("An unexpected error occurred");
    }
}));
// Route to get products by category
router.get("/GetProducts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let query = "";
    let Category = req.query.Category;
    if (Category) {
        query = `SELECT * FROM product WHERE productcategory=?`;
    }
    else {
        query = `SELECT * FROM product`;
    }
    try {
        const stmt = db.prepare(query);
        const rows = Category ? stmt.all(Category) : stmt.all();
        return res.status(200).json(rows);
    }
    catch (error) {
        console.error("Unexpected error:", error.message);
        return res.status(500).send("An unexpected error occurred");
    }
}));
exports.default = router;
