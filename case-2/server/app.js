if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const router = require("./router/index");
const error = require("./middleware/error");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);
app.use(error);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
