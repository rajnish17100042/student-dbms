// include express module in our app
const express = require("express");

// now create an app variable which will store all the functions and methods defined by the express module
const app = express();

const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config({ path: "./config.env" });
// require("./db/conn");
const port = process.env.PORT;

//adding middleware so that the application can understand the json data recieved at the endpoint(/register)
app.use(express.json());

//adding middleware for the cookie parser to use the cookies

app.use(cookieParser());

// use cors to send the data from one port to other
//no need to use cors if proxy is used in the frontend
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

//using middleware to use the route we created

app.use(require("./router/routes"));

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server is running at the port ${port}`);
});
