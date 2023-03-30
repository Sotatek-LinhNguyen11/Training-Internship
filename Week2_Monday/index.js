const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const redisClient = require("./utility");

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

app.post("/author", (req, res) => {
  // console.log(req.body);
  const author = {
    id: authors.length + 1,
    fullName: req.body.fullName,
    age: req.body.age,
    desc: req.body.desc,
  };
  authors.push(author);
  console.log(authors);
  // res.send(author);
  redisClient.set();
});
app.post("/form", (req, res) => {
  const article = {
    id: articles.length + 1,
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.authorId,
  };
  articles.push(article);
  console.log(articles);
});

app.get("/list", (req, res) => {
  let arrayArticles = new Array();
  articles.forEach((element) => {
    let author = authors.find((author) => author.id == element.authorId);
    let article = {
      id: element.id,
      title: element.title,
      content: element.content,
      author: author,
    };
    arrayArticles.push(article);
  });
  res.send(arrayArticles);
});
app.listen(port, () => console.log(`Listen at http://localhost:${port}`));
