const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// saltRound for password hashing
const saltRounds = 12;

// requiring database connection
const db = require("../db/conn");

// create an endpoint or route for the home page
router.get("/", (req, res) => {
  res.send("<h1>Hello from the Home Page.....This is the Express router</h1>");
});

// create route for student registration
router.post("/registerStudent", (req, res) => {
  const studentData = req.body;
  console.log(studentData);

  // destructuring student data
  let {
    name,
    email,
    phone,
    address,
    city,
    state,
    pincode,
    batch,
    admissionDate,
    personalMentor,
    password,
  } = req.body;

  //   server side validation
  if (
    !name ||
    !email ||
    !phone ||
    !address ||
    !city ||
    !state ||
    !pincode ||
    !batch ||
    !admissionDate ||
    !personalMentor ||
    !password
  ) {
    return res.status(400).json("Please fill the data properly");
  }

  // before registration check if student already present
  db.query(
    "select email from student_registration where email=?",
    email,
    (err, result) => {
      if (err) {
        // throw err;
        return res.status(400).json("Some error occured please register again");
      }
      //   console.log(result, result.length);
      if (result.length > 0) {
        // console.log("helo hello hello");
        return res.status(400).json("User is already registered");
      } else {
        // password hashing using bcrypt
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) {
            // throw err;
            return res
              .status(400)
              .json("Some error occured please register again");
          }
          password = hash;
          // console.log(password);
          let sql = "insert into student_registration set ?";
          let data = {
            name,
            email,
            phone,
            address,
            city,
            state,
            pincode,
            batch,
            admission_date: admissionDate,
            personal_mentor: personalMentor,
            password,
          };

          // insert the data to database
          db.query(sql, data, (err, result) => {
            if (err) {
              //   throw err;
              return res
                .status(400)
                .json("Some error occured please registered again");
            }
            //   console.log(result);
            return res.status(200).json("Student registedred Successfully");
          });
        });
      }
    }
  );
});

module.exports = router;
