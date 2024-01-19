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

app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;

  const newUsers = db.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
    [name, email, password]
  );

  res.json(newUsers);
});

app.get("/posts", async (req, res) => {
  const result = await db.query("SELECT * FROM posts");
  res.json(result.rows);
});

app.get("/posts/:userid", async (req, res) => {
  const result = await db.query("SELECT * FROM posts WHERE id = userid", [id]);
  res.json(result.rows);
});

app.get("/posts/:postsid", async (req, res) => {
  const postId = req.params.postsid;
  console.log("id", postId);
  const result = await db.query("SELECT * FROM posts WHERE posts.id = $1", [
    postId,
  ]);
  console.log("re", result.rows);
  res.json(result.rows);
});

app.post("/posts", async (req, res) => {
  const { title, content } = req.body;

  const newPosts = db.query(
    `INSERT INTO posts (title, content) VALUES ($1, $2)`,
    [title, content]
  );
  res.json(newPosts);
});

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
