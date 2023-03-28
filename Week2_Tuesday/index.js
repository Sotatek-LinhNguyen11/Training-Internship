const express = require("express");
const bodyParser = require("body-parser");
const knex = require("./database");
const app = express();
const port = 3000;

app.use(express.json());

const authors = [
  {
    id: 1,
    fullName: "Tieu Dao",
    age: 22,
    desc: "Tieu Dao la tac gia cua ca truyen kiem hiep hay va pho bien",
  },
];
const articles = [
  {
    id: 1,
    title: "tieu de",
    content: "noi dung",
    authorId: 1,
  },
];

app.post("/author", async (req, res) => {
  const requestData = req.body;
  const { fullName, age, desc } = requestData;
  try {
    await knex("author").insert({
      fullname: fullName,
      age,
      description: desc,
    });
    res.send(200, "Inserting new author successfully!");
  } catch (error) {
    console.log(error.message);
    res.send(500, "Error inserting author!", error.message);
  }
});

app.post("/form", async (req, res) => {
  const requestData = req.body;
  const { title, content, authorId } = requestData;
  try {
    await knex("article").insert({
      title,
      content,
      authorid: authorId,
    });
    res.send(200, "Inserting new article successfully!");
  } catch (error) {
    console.log(error.message);
    res.send(500, "Error inserting article!", error.message);
  }
});

app.get("/list", async (req, res) => {
  try {
    const articleList =await knex("article as a")
      .join("author", "author.id", "=", "a.authorid")
      .select("a.id","a.title","a.content","author.* as author");
    res.send(200, articleList);
  } catch (error) {
    console.log(error.message);
    res.send(500, "Error getting article!");
  }
});
app.listen(port, () => console.log(`Listen at http://localhost:${port}`));
