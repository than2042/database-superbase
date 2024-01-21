import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";
// import multer from "multer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());

// const upload = multer({ storage: multer.memoryStorage() });

const dbConnectionString = process.env.DATABASE_URL;
const db = new pg.Pool({ connectionString: dbConnectionString });

app.get("/", (req, res) => {
  res.json("This is my root!!");
});

app.get("/users", async (req, res) => {
  const result = await db.query("SELECT * FROM users");
  res.json(result.rows);
});

// create user query
app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;

  const newUsers = db.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
    [name, email, password]
  );

  res.json(newUsers);
});

// search query
app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;

  let query = "SELECT title FROM posts";

  if (id) {
    query += " WHERE id = posts.id";
  }
  const params = id ? [id] : [];

  try {
    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query:", error);
  }
});

// delete query
app.delete("/posts/:id", async (req, res) => {
  const postId = req.params.id;
  const result = await db.query("DELETE FROM posts WHERE id = $1", [postId]);
  res.json(result.rowCount);
});

app.get("/posts/:userid", async (req, res) => {
  const result = await db.query("SELECT * FROM posts WHERE id = userid", [id]);
  res.json(result.rows);
});

// get all the post query
app.get("/posts/:postsid", async (req, res) => {
  const postId = req.params.postsid;
  console.log("id", postId);
  const result = await db.query("SELECT * FROM posts WHERE posts.id = $1", [
    postId,
  ]);
  console.log("re", result.rows);
  res.json(result.rows);
});

// create image into db query
// app.post("/posts", upload.single("image"), async (req, res) => {
//   const { title, content } = req.body;
//   const image = req.file ? req.file.buffer.toString("base64") : null;
//   console.log(image);
//   const newPosts = db.query(
//     `INSERT INTO posts (title, content, image) VALUES ($1, $2, $3)`,
//     [title, content, image]
//   );

//   res.json(newPosts);
// });

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await db.query(
    "SELECT * FROM users WHERE email = $1 AND password = $2",
    [email, password]
  );
  res.json(result.rows);
});

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
