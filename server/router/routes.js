const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

// route for common login
router.post("/login", (req, res) => {
  // based on the role will select the table
  let tableName = "";
  const data = req.body;
  // console.log(data);

  // destructuring of data
  const { email, password, role } = req.body;

  // server side validation
  if (!email || !password || !role) {
    return res.status(400).json("Please fill the data correctly");
  }
  // now based on the role choose the table for student,teacher or admin
  if (role === "student") {
    tableName = "student_registration";
  } else if (role === "teacher") {
    tableName = "teacher_registration";
  } else if (role === "admin") {
    tableName = "admin_registration";
  }

  //  first  search the user in the database with the help of email and take only email and password, will need later to generate payload for jwt and passowrd verification
  const sql = `select email,password from ${tableName} where email=?`;
  db.query(sql, email, async (err, result) => {
    // if user is not found then the result will be an empty array
    // console.log(result[0].password);
    let dbpassword = result[0].password;
    let dbemail = result[0].email;
    if (err) {
      //  throw err;
      return res.status(400).json("Some error occured! Please try again");
    } else if (!result.length) {
      //or we can write result.length===0
      return res.status(400).json("User not found");
    }

    // console.log("User found checking password");
    try {
      // use the password retrieved from the database in the above query
      // console.log(dbpassword);
      // now compare the password using bcrypt  ...password===dbpassword
      const passwordMatch = await bcrypt.compare(password, dbpassword); //returns true or false
      // console.log(passwordMatch);
      if (!passwordMatch) {
        // console.log("invalid credentials");
        return res.status(400).json("Invalid Credentials");
      }
      // if every thing is fine then genetate a  token for the user ...jwt authentication and store it in the cookie for access the protected routed
      const payload = {
        email: dbemail,
        password: dbpassword,
      };
      jwt.sign({ payload }, "secretKey", (err, token) => {
        if (err) {
          // throw err;
          return res.status(400).json("Some error occured! Please try again");
        }
        // console.log(token);

        res.cookie("token", token, {
          expires: new Date(Date.now() + 2592000), //time in millisecond  30days...24*60*60*30*1000 millisecond
          httpOnly: true,
        });

        //if cookie is not workig the store token in the browser local storage
        // window.localStorage.setItem("token", token);
        // console.log(token);
        return res.status(200).json({
          Success: "User logged in successfully",
          access_token: token,
        });
      });
    } catch (err) {
      return res.status(400).json("Some error occured! Please try again");
    }
  });

  // console.log(result);
});
module.exports = router;
