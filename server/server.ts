import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { inngest, functions } from "./inngest/index.js";
import { serve } from "inngest/express";
import connectDB from "./config/db.js";

dotenv.config();
await connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/inngest", serve({ client: inngest, functions }));
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
