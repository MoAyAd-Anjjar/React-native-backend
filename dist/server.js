"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("./Route/User"));
const Item_1 = __importDefault(require("./Route/Item"));
const Cart_1 = __importDefault(require("./Route/Cart"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use("/User", User_1.default);
app.use("/Product", Item_1.default);
app.use("/Cart", Cart_1.default);
const port = process.env.PORT || 8000;
app.get("/", (req, res) => {
    res.send("Welcome to ShopeApp Backend!");
});
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
