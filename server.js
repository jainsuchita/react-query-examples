const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

const favLangs = ["html", "css", "react"];

app.get("/api/get-records", (req, res) => {
  res.json(favLangs);
});

app.post("/api/create-record", (req, res) => {
  const records = req.body.records;
  favLangs.push(records);
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
