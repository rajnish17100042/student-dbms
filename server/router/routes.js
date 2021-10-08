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
  // console.log(studentData);

  // destructuring the data
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
        return res.status(400).json("Student is already registered");
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

//route for teacher registration
router.post("/registerTeacher", (req, res) => {
  const teacherData = req.body;
  // console.log(teacherData);

  // destructuring the data
  let {
    name,
    email,
    phone,
    address,
    city,
    state,
    pincode,
    qualification,
    experience,
    joiningDate,
    salary,
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
    !qualification ||
    !experience ||
    !joiningDate ||
    !salary ||
    !password
  ) {
    return res.status(400).json("Please fill the data properly");
  }

  // before registration check if student already present
  db.query(
    "select email from teacher_registration where email=?",
    email,
    (err, result) => {
      if (err) {
        // throw err;
        return res.status(400).json("Some error occured please register again");
      }
      //   console.log(result, result.length);
      if (result.length > 0) {
        // console.log("helo hello hello");
        return res.status(400).json("already registered");
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
          let sql = "insert into teacher_registration set ?";
          let data = {
            name,
            email,
            phone,
            address,
            city,
            state,
            pincode,
            qualification,
            experience,
            joining_date: joiningDate,
            salary,
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
            return res.status(200).json("Teacher registedred Successfully");
          });
        });
      }
    }
  );
});

// create route for Admin registration
router.post("/registerAdmin", (req, res) => {
  const adminData = req.body;
  // console.log(adminData);

  // destructuring the data
  let {
    name,
    email,
    phone,
    address,
    city,
    state,
    pincode,
    joiningDate,
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
    !joiningDate ||
    !password
  ) {
    return res.status(400).json("Please fill the data properly");
  }

  // before registration check if admin already present
  db.query(
    "select email from admin_registration where email=?",
    email,
    (err, result) => {
      if (err) {
        // throw err;
        return res.status(400).json("Some error occured please register again");
      }
      //   console.log(result, result.length);
      if (result.length > 0) {
        // console.log("helo hello hello");
        return res.status(400).json("Admin is already registered");
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
          let sql = "insert into admin_registration set ?";
          let data = {
            name,
            email,
            phone,
            address,
            city,
            state,
            pincode,
            joining_date: joiningDate,
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
            return res.status(200).json("Admin registedred Successfully");
          });
        });
      }
    }
  );
});

module.exports = router;
