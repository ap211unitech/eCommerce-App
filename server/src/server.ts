import * as dotenv from "dotenv";
import express, { Express, Request, Response } from "express";

dotenv.config({ path: __dirname + "/.env" });

const app: Express = express();

const PORT = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "Server running !!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
