
const express = require("express");
const connectDb=require('./src/mongoDb/mongodb')
const userRoutes = require("./src/routes/userRoutes");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URL;
const PORT=process.env.PORT || 3000
connectDb(MONGO_URI)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
