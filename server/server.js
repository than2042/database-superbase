import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(cors());

const dbConnectionString = process.env.DATABASE_URL;
const db = new pg.Pool({ connectionString: dbConnectionString });

app.get("/", (req, res) => {
  res.json("This is my root!!");
});

app.get("/users", async (req, res) => {
  const result = await db.query("SELECT * FROM users");
  res.json(result.rows);
});

app.get("/posts", async (req, res) => {
  const result = await db.query("SELECT * FROM posts");
  res.json(result.rows);
});

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
