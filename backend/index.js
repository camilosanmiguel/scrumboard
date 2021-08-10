const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/db");
require("dotenv").config();

const Role = require("./routes/role");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/role",Role);

app.listen(process.env.PORT, () => console.log("backen server runnin ok, on port: ",process.env.PORT));

dbConnection();