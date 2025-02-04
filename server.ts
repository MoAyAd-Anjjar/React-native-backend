
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import UserRouter from "./Route/User"
import UserProduct from "./Route/Item"
import UserCart from "./Route/Cart"

import cors from "cors";
import bodyParser from "body-parser"
dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/User",UserRouter)
app.use("/Product",UserProduct)
app.use("/Cart",UserCart)



const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
});
