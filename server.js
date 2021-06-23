const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
const port = 3000;

// Languages
const favLangs = ["html", "css", "react"];

app.get("/api/get-records", (req, res) => {
  res.json(favLangs);
});

app.post("/api/create-record", (req, res) => {
  const records = req.body.records;
  favLangs.push(records);
  res.json({ status: "ok" });
});

const users = [
  {
    id: 1,
    name: "Mombo",
    details: "blah Mombo",
  },
  {
    id: 2,
    name: "Dumbo",
    details: "blah Dumbo test 1",
  },
];

// Users
app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  for (let user of users) {
    if (user.id === parseInt(id)) {
      res.json(user);
      return;
    }
  }

  // Sending 404 when not found something is a good practice
  res.status(404).send("User not found");
});

app.put("/users/:id", (req, res) => {
  // Reading id from the URL
  const id = req.params.id;
  const newUser = req.body;

  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    if (user.id === parseInt(id)) {
      users[i] = {
        ...newUser,
      };
    }
  }
  res.json(users);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
