const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();

PORT = 4000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.status(200).send("<h1>SELAMAT DATANG DI API BACKEND UJIAN JC12</h1>");
});

const { productRouters, storeRouters, inventoryRouters } = require("./routers");
app.use("/product", productRouters);
app.use("/store", storeRouters);
app.use("/inventory", inventoryRouters);

app.listen(PORT, () => console.log(`APP JALAN DI PORT ${PORT}`));
