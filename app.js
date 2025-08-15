require("dotenv").config();
const express = require("express");
const app = express();
const { router: todoRoutes, todos} = require("./routes/todo");
const cors = require("cors");
const db = require("./database/db");
const port = process.env.PORT || 3001;


const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");

app.use("/todos", todoRoutes);

app.get("/todos-data", (req, res) => {
  res.json(todos);
});

app.get("/todos-list", (req, res) => {
  res.render("todos-page", { todos: todos, layout: "layouts/main-layout" });
});


app.get("/", (req, res) => {
  res.render("index", {
    layout: "layouts/main-layout",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {layout: "layouts/main-layout"});
});

app.get("/todo-view", (req, res) => {
  db.query("SELECT * FROM todos", (err, todos) => {
    if (err) {
      console.error("Error fetching todos:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.render("todo", { todos: todos, layout: "layouts/main-layout" });
  });
});


app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});