const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use("/proxy", async (req, res) => {
  try {
    const response = await fetch("http://bbc.mebel-zakaz.uz/slider/slider/");
    const data = await response.json();
    res.send(data);
  } catch (error) {
    res.status(500).send("Serverda xatolik yuz berdi");
  }
});

app.listen(3000, () => {
  console.log("Proksi server 3000-portda tinglanmoqda");
});
