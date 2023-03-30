const express = require("express");
const bodyParser = require("body-parser");
const knex = require("./database/knex");
const client = require("./database/redis");
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
    res.status(200).send("Inserting new author successfully!");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error inserting author!");
  }
});

app.get("/author/:id", async (req, res) => {
  try {
    await client.connect();
    const author_id = "author_" + req.params.id;
    var value = await client.get(author_id);
    if (value == null) {
      const author = await knex
        .select("fullname", "age", "description")
        .from("author")
        .where("id", req.params.id);

      await client.set(author_id, JSON.stringify(author), (ex = 1000));
      value = await client.get(author_id);
    }
    res.status(200).send(value);
    await client.disconnect();
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

app.get("/article/:id", async (req, res) => {
  try {
    await client.connect();
    const article_id = "article_" + req.params.id;
    // await client.del(article_id);
    var value = await client.get(article_id);
    // console.log("Value***********" + value);
    if (value == null) {
      const article = await knex
        .select("title", "content", "authorid")
        .from("article")
        .where("id", req.params.id);
      console.log(article);
      await client.set(article_id, JSON.stringify(article), 1000);
      value = await client.get(article_id);
    }
    res.status(200).send(value);
    await client.disconnect();
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

app.post("/article", async (req, res) => {
  const requestData = req.body;
  const { title, content, authorId } = requestData;
  try {
    await knex("article").insert({
      title,
      content,
      authorid: authorId,
    });
    res.status(200).send("Inserting new article successfully!");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error inserting article!");
  }
});

app.get("/list", async (req, res) => {
  try {
    await client.connect();
    await client.del("list");
    var value = await client.lRange("list", 0, -1);
    console.log(value);
    if (value.length == 0) {
      const articleList = await knex("article as a")
        .join("author", "author.id", "=", "a.authorid")
        .select("a.id", "a.title", "a.content", "author.* as author");
      console.log(articleList);
      for (element of articleList) {
        await client.lPush("list", JSON.stringify(element), (ex = 1000));
      }
      value = await client.lRange("list", 0, -1);
    }
    console.log(value);
    res.status(200).send(JSON.parse(value));
    await client.disconnect();
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error getting article!");
  }
});
app.listen(port, () => console.log(`Listen at http://localhost:${port}`));
