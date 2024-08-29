require("dotenv").config();

const express = require("express");

const cors = require("cors");
require("./connection");

const routes = require("./routes");

const paypal = require('./services/paypal.js')

PORT = 4000 || process.env.PORT;

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

// app.get('/',(req,res)=>{
//   res.status(200).json('hii')
// })

app.listen(PORT, () => {
  console.log("server running at: ", PORT);
});
