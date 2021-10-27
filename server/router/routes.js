const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
// saltRound for password hashing
const saltRounds = 12;

// requiring database connection
const db = require("../db/conn");

//include authenticate middleware here...
const authenticate = require("../middleware/authenticate");

//include mailer function to send password in the mail after successful registration of User
const passwordMailer = require("../mailer/password_mailer.js");
const noticeMailer = require("../mailer/notice_mailer.js");
const resetPasswordLinkMailer = require("../mailer/reset_password_link_mailer.js");
const jobMailer = require("../mailer/job_mailer.js");
// const message = passwordMailer("rajnish17100042@gmail.com");

//include image uploading function
const uploadImage = require("../fileUploading/imageUploading.js");
const uploadResume = require("../fileUploading/resumeUploading.js");
const uploadImageToS3 = require("../fileUploading/imageUploadAmazonS3.js");

// create an endpoint or route for the home page
router.get("/", (req, res) => {
  res.send("<h1>Hello from the Home Page.....This is the Express router</h1>");
});

// create route for student registration
router.post("/registerStudent", authenticate, (req, res) => {
  // console.log(req.user);
  // console.log(req.role);
  const studentData = req.body;
  // console.log(studentData);

  if (req.role !== "admin") {
    return res.status(400).json({ error: "Error! Try agiain" });
  } else {
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
          return res
            .status(400)
            .json("Some error occured please register again");
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
              // send mail to student
              passwordMailer(email, name);
              return res.status(200).json("Student registedred Successfully");
            });
          });
        }
      }
    );
  }
});

//creating route to get data of a particular student based on the id of the student to dislpay on edit page

router.get("/registerStudent/:id", authenticate, async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  try {
    const sql = `select * from student_registration where id=${id}`;
    db.query(sql, (err, result) => {
      if (err) {
        // throw err
        return res.status(400).json({ error: "Some Error Occured!" });
      } else {
        // console.log(result);
        return res.status(200).json(result);
      }
    });
  } catch (err) {
    return res.status(400).json({ error: "Some Error Occured!" });
  }
});

//creating route to update data of a particular student based on the id of the student
router.patch("/registerStudent/:id", authenticate, async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  console.log(data);

  const {
    name,
    email,
    phone,
    address,
    city,
    state,
    pincode,
    batch,
    admission_date,
    personal_mentor,
  } = data;

  try {
    console.log(id);
    const sql = `update student_registration set name=?,email=?,phone=?,address=?,city=?,state=?,pincode=?,batch=?,admission_date=?,personal_mentor=? where id=${id}`;
    db.query(
      sql,
      [
        name,
        email,
        phone,
        address,
        city,
        state,
        pincode,
        batch,
        admission_date,
        personal_mentor,
      ],
      (err, result) => {
        if (err) {
          throw err;
          // return res.status(400).json({ error: "Some Error Occured!" });
        } else {
          console.log(result);
          return res.status(200).json(result);
        }
      }
    );
  } catch (err) {
    return res.status(400).json({ error: "Some Error Occured!" });
  }
});

//route to update student password
router.patch("/updateStudentPassword/:id", authenticate, async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  // console.log(data);
  const { currentPassword, newPassword } = data;
  try {
    // first check if the password saved in the database matches with the current password
    const sql = `select password from student_registration where id=${id}`;
    db.query(sql, async (err, result) => {
      if (err) {
        // throw err
        return res.status(400).json({ error: "Some Error Occured!" });
      } else {
        // console.log(result);
        const dbpassword = result[0].password;
        // console.log(dbpassword);
        // now compare the current password and the password stored in database
        const passwordMatch = await bcrypt.compare(currentPassword, dbpassword);
        // console.log(passwordMatch);
        if (!passwordMatch) {
          return res.status(400).json({ error: "Some Error Occured!" });
        } else {
          // update the password of student
          // first password hashing  is done
          const hash = await bcrypt.hash(newPassword, saltRounds);
          // console.log(hash);
          if (!hash) {
            return res.status(400).json({ error: "Some Error Occured!" });
          } else {
            // store hash in database with proper id matching
            const sql = `update student_registration set password=? where id=${id}`;
            db.query(sql, hash, (err, result) => {
              if (err) {
                // throw err
                return res.status(400).json({ error: "Some Error Occured!" });
              } else if (!result) {
                return res.status(400).json({ error: "Some Error Occured!" });
              } else {
                return res
                  .status(200)
                  .json({ Success: "Password updated successfully!" });
              }
            });
          }
        }
      }
    });
  } catch (err) {
    // throw err
    return res.status(400).json({ error: "Some Error Occured!" });
  }
});

//route to delete a student
router.delete("/registerStudent/:id", authenticate, async (req, res) => {
  const id = req.params.id;
  // console.log(req.params);
  console.log(id);
  try {
    const sql = `delete from student_registration where id=${id}`;
    db.query(sql, (err, result) => {
      if (err) {
        // throw err;
        return res.status(400).json({ error: "Some Error Occured!" });
      } else {
        console.log(result);
        return res.status(200).json(result);
      }
    });
  } catch (err) {
    // throw err;
    return res.status(400).json({ error: "Some Error Occured!" });
  }
});

//route for teacher registration
router.post("/registerTeacher", authenticate, (req, res) => {
  // console.log(req.user);
  // console.log(req.role);
  const teacherData = req.body;
  // console.log(teacherData);
  if (req.role !== "admin") {
    return res.status(400).json({ error: "Error! Try agiain" });
  } else {
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
          return res
            .status(400)
            .json("Some error occured please register again");
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
              // send eamil
              passwordMailer(email, name);
              return res.status(200).json("Teacher registedred Successfully");
            });
          });
        }
      }
    );
  }
});

//creating route to get data of a particular teacher based on the id of the student to dislpay on edit page

router.get("/registerTeacher/:id", authenticate, async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  try {
    const sql = `select * from teacher_registration where id=${id}`;
    db.query(sql, (err, result) => {
      if (err) {
        // throw err
        return res.status(400).json({ error: "Some Error Occured!" });
      } else {
        // console.log(result);
        return res.status(200).json(result);
      }
    });
  } catch (err) {
    return res.status(400).json({ error: "Some Error Occured!" });
  }
});

//creating route to update data of a particular teacher based on the id of the teacher

router.patch("/registerteacher/:id", authenticate, async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  console.log(data);

  const {
    name,
    email,
    phone,
    address,
    city,
    state,
    pincode,
    qualification,
    experience,
    joining_date,
    salary,
  } = data;

  try {
    console.log(id);
    const sql = `update teacher_registration set name=?,email=?,phone=?,address=?,city=?,state=?,pincode=?,qualification=?,experience=?,joining_date=?,salary=? where id=${id}`;
    db.query(
      sql,
      [
        name,
        email,
        phone,
        address,
        city,
        state,
        pincode,
        qualification,
        experience,
        joining_date,
        salary,
      ],
      (err, result) => {
        if (err) {
          throw err;
          // return res.status(400).json({ error: "Some Error Occured!" });
        } else {
          console.log(result);
          return res.status(200).json(result);
        }
      }
    );
  } catch (err) {
    return res.status(400).json({ error: "Some Error Occured!" });
  }
});

//route to update teacher password
router.patch("/updateTeacherPassword/:id", authenticate, async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  // console.log(data);
  const { currentPassword, newPassword } = data;
  try {
    // first check if the password saved in the database matches with the current password
    const sql = `select password from teacher_registration where id=${id}`;
    db.query(sql, async (err, result) => {
      if (err) {
        // throw err
        return res.status(400).json({ error: "Some Error Occured!" });
      } else {
        // console.log(result);
        const dbpassword = result[0].password;
        // console.log(dbpassword);
        // now compare the current password and the password stored in database
        const passwordMatch = await bcrypt.compare(currentPassword, dbpassword);
        // console.log(passwordMatch);
        if (!passwordMatch) {
          return res.status(400).json({ error: "Some Error Occured!" });
        } else {
          // update the password of teacher
          // first password hashing  is done
          const hash = await bcrypt.hash(newPassword, saltRounds);
          // console.log(hash);
          if (!hash) {
            return res.status(400).json({ error: "Some Error Occured!" });
          } else {
            // store hash in database with proper id matching
            const sql = `update teacher_registration set password=? where id=${id}`;
            db.query(sql, hash, (err, result) => {
              if (err) {
                // throw err
                return res.status(400).json({ error: "Some Error Occured!" });
              } else if (!result) {
                return res.status(400).json({ error: "Some Error Occured!" });
              } else {
                return res
                  .status(200)
                  .json({ Success: "Password updated successfully!" });
              }
            });
          }
        }
      }
    });
  } catch (err) {
    // throw err
    return res.status(400).json({ error: "Some Error Occured!" });
  }
});

//route to delete a teacher
router.delete("/registerTeacher/:id", authenticate, async (req, res) => {
  const id = req.params.id;
  // console.log(req.params);
  console.log(id);
  try {
    const sql = `delete from teacher_registration where id=${id}`;
    db.query(sql, (err, result) => {
      if (err) {
        // throw err;
        return res.status(400).json({ error: "Some Error Occured!" });
      } else {
        console.log(result);
        return res.status(200).json(result);
      }
    });
  } catch (err) {
    // throw err;
    return res.status(400).json({ error: "Some Error Occured!" });
  }
});

// create route for Admin registration
router.post("/registerAdmin", authenticate, (req, res) => {
  // console.log(req.user);
  // console.log(req.role);
  const adminData = req.body;
  // console.log(adminData);
  if (req.role !== "admin") {
    return res.status(400).json({ error: "Error! Try agiain" });
  } else {
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
          return res
            .status(400)
            .json("Some error occured please register again");
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
              // send email
              passwordMailer(email, name);
              return res.status(200).json("Admin registedred Successfully");
            });
          });
        }
      }
    );
  }
});

//creating route to get data of a particular admin based on the id of the admin to dislpay on edit page

router.get("/registerAdmin/:id", authenticate, async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  try {
    const sql = `select * from admin_registration where id=${id}`;
    db.query(sql, (err, result) => {
      if (err) {
        // throw err
        return res.status(400).json({ error: "Some Error Occured!" });
      } else {
        // console.log(result);
        return res.status(200).json(result);
      }
    });
  } catch (err) {
    return res.status(400).json({ error: "Some Error Occured!" });
  }
});

//creating route to update data of a particular admin based on the id of the admin
router.patch("/registerAdmin/:id", authenticate, async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  console.log(data);

  const { name, email, phone, address, city, state, pincode, joining_date } =
    data;

  try {
    console.log(id);
    const sql = `update admin_registration set name=?,email=?,phone=?,address=?,city=?,state=?,pincode=?,joining_date=? where id=${id}`;
    db.query(
      sql,
      [name, email, phone, address, city, state, pincode, joining_date],
      (err, result) => {
        if (err) {
          throw err;
          // return res.status(400).json({ error: "Some Error Occured!" });
        } else {
          console.log(result);
          return res.status(200).json(result);
        }
      }
    );
  } catch (err) {
    return res.status(400).json({ error: "Some Error Occured!" });
  }
});

//route to update admin password
router.patch("/updateAdminPassword/:id", authenticate, async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  // console.log(data);
  const { currentPassword, newPassword } = data;
  try {
    // first check if the password saved in the database matches with the current password
    const sql = `select password from admin_registration where id=${id}`;
    db.query(sql, async (err, result) => {
      if (err) {
        // throw err
        return res.status(400).json({ error: "Some Error Occured!" });
      } else {
        // console.log(result);
        const dbpassword = result[0].password;
        // console.log(dbpassword);
        // now compare the current password and the password stored in database
        const passwordMatch = await bcrypt.compare(currentPassword, dbpassword);
        // console.log(passwordMatch);
        if (!passwordMatch) {
          return res.status(400).json({ error: "Some Error Occured!" });
        } else {
          // update the password of admin
          // first password hashing  is done
          const hash = await bcrypt.hash(newPassword, saltRounds);
          // console.log(hash);
          if (!hash) {
            return res.status(400).json({ error: "Some Error Occured!" });
          } else {
            // store hash in database with proper id matching
            const sql = `update admin_registration set password=? where id=${id}`;
            db.query(sql, hash, (err, result) => {
              if (err) {
                // throw err
                return res.status(400).json({ error: "Some Error Occured!" });
              } else if (!result) {
                return res.status(400).json({ error: "Some Error Occured!" });
              } else {
                return res
                  .status(200)
                  .json({ Success: "Password updated successfully!" });
              }
            });
          }
        }
      }
    });
  } catch (err) {
    // throw err
    return res.status(400).json({ error: "Some Error Occured!" });
  }
});

//route to delete a teacher
router.delete("/registerAdmin/:id", authenticate, async (req, res) => {
  const id = req.params.id;
  // console.log(req.params);
  console.log(id);
  try {
    const sql = `delete from admin_registration where id=${id}`;
    db.query(sql, (err, result) => {
      if (err) {
        // throw err;
        return res.status(400).json({ error: "Some Error Occured!" });
      } else {
        console.log(result);
        return res.status(200).json(result);
      }
    });
  } catch (err) {
    // throw err;
    return res.status(400).json({ error: "Some Error Occured!" });
  }
});

// route for common login
router.post("/login", (req, res) => {
  // global variables
  // based on the role will select the table
  let tableName = "";
  let dbpassword = "";
  let dbemail = "";

  // destructuring of data
  let { email, password, role } = req.body;
  const data = req.body;
  // console.log(data);

  // server side validation
  if (!email || !password || !role) {
    return res.status(400).json({ error: "Please fill the data correctly" });
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
    // console.log(result);
    if (!result) {
      return res.status(400).json("Some error occured! Please try again");
    }
    if (result.length) {
      dbpassword = result[0].password;
      dbemail = result[0].email;
    }

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

      // checking if role variable is accessed here
      // console.log(role);
      const payload = {
        email: dbemail,
        password: dbpassword,
        role,
      };
      // console.log(payload);
      jwt.sign({ payload }, secretKey, (err, token) => {
        if (err) {
          // throw err;
          return res.status(400).json("Some error occured! Please try again");
        }
        // console.log(token);

        res.cookie("accessToken", token, {
          expiresIn: "15min",
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

// route for forget password ...will check for user existence in database and send
router.post("/forget-password", (req, res) => {
  // get the request body
  // console.log(req.body);
  const { email, role } = req.body;
  let tablename = ""; //global

  // server side validation   ....what if request is sent from postman
  if (!email || !role) {
    return res.status(400).json({ error: "Please Fill the data properly" });
  }
  //check if user exists in the database
  // first select the table based on role of the user
  if (role === "admin") {
    tablename = "admin_registration";
  } else if (role === "teacher") {
    tablename = "teacher_registration";
  } else if (role === "student") {
    tablename = "student_registration";
  }
  const sql = `select id,email,password from ${tablename} where email=?`;
  db.query(sql, email, (err, result) => {
    if (err) {
      // throw err;
      return res.status(400).json({ error: "Some Error Occured!" });
    } else if (!result.length) {
      return res.status(400).json({ error: "Some Error Occured!" });
    } else if (result.length) {
      // console.log(result);
      // now get the passowrd from the result
      const { password } = result[0];
      // console.log(email, password);
      //user exists and now create one time link valid for 15 minutes  for that generate a new secret key using original secret key and user password stored in the database
      const secret = secretKey + password; //this secret is unique for all users
      //now define the payload for the jwt
      const payload = {
        email,
        role,
      };

      //now generate jwt
      const token = jwt.sign(payload, secret, { expiresIn: "15m" });
      // console.log(token);
      //now generate the reset password link
      const resetPasswordLink = `http://localhost:8080/reset-password/${role}/${email}/${token}`;
      // console.log(resetPasswordLink);
      //send the reset password link to email
      resetPasswordLinkMailer(email, resetPasswordLink);
      return res
        .status(200)
        .json({ message: "Check your mail for password reset link" });
    }
  });
});

// route to authenticate the user for the reset password
router.get("/reset-password/:role/:email/:token", (req, res) => {
  const params = req.params;
  const { role, email, token } = params;
  let tablename = ""; //global
  // console.log(params);
  // first check if user exists in the database
  // first select the table based on role of the user
  if (role === "admin") {
    tablename = "admin_registration";
  } else if (role === "teacher") {
    tablename = "teacher_registration";
  } else if (role === "student") {
    tablename = "student_registration";
  }
  const sql = `select id,email,password from ${tablename} where email=?`;
  db.query(sql, email, (err, result) => {
    if (err) {
      // throw err;
      return res.status(400).json({ error: "Some Error Occured!" });
    } else if (!result.length) {
      return res.status(400).json({ error: "Some Error Occured!" });
    } else if (result.length) {
      // console.log(result);
      // now get the passowrd from the result
      const { password } = result[0];
      // console.log(email, password);
      //user exists and now verify the token
      const secret = secretKey + password; //this secret is unique for all users

      // use try catch block to verify token
      try {
        const payload = jwt.verify(token, secret); //returns the payload if token verified
        return res
          .status(200)
          .json({ message: "Reset Password Page is rendering" });
      } catch (err) {
        // throw err;
        return res.status(400).json({ error: "Some Error Occured!" });
      }
    }
  });
});

// route to reset the password
router.post("/reset-password/:role/:email/:token", (req, res) => {
  const params = req.params;
  const { newPassword, cnewPassword } = req.body;
  // console.log(newPassword);
  // server side validation
  if (!newPassword || !cnewPassword || newPassword !== cnewPassword) {
    return res.status(400).json({ error: "Please fill the data properly" });
  }
  const { role, email, token } = params;
  let tablename = ""; //global
  // console.log(params);
  // first check if user exists in the database
  // first select the table based on role of the user
  if (role === "admin") {
    tablename = "admin_registration";
  } else if (role === "teacher") {
    tablename = "teacher_registration";
  } else if (role === "student") {
    tablename = "student_registration";
  }
  const sql = `select email,password from ${tablename} where email=?`;
  db.query(sql, email, (err, result) => {
    if (err) {
      // throw err;
      return res.status(400).json({ error: "Some Error Occured!" });
    } else if (!result.length) {
      return res.status(400).json({ error: "Some Error Occured!" });
    } else if (result.length) {
      // console.log(result);
      // now get the passowrd from the result
      const { password } = result[0];
      // console.log(email, password);
      //user exists and now verify the token
      const secret = secretKey + password; //this secret is unique for all users

      // use try catch block to verify token
      try {
        const payload = jwt.verify(token, secret); //returns the payload if token verified
        // console.log(payload);
        if (!payload) {
          return res.status(400).json({ error: "Some Error Occured!" });
        } else if (payload) {
          //update password
          //first hash the password
          bcrypt.hash(newPassword, saltRounds, (err, hash) => {
            if (err) {
              // throw err;
              return res.status(400).json({ error: "Some Error Occured!" });
            } else {
              const sql2 = `update ${tablename} set password=? where email=?`;
              db.query(sql2, [hash, email], (err, result) => {
                if (err) {
                  // throw err;
                  return res.status(400).json({ error: "Some Error Occured!" });
                } else if (!result) {
                  return res.status(400).json({ error: "Some Error Occured!" });
                } else if (result) {
                  // console.log(result);
                  return res
                    .status(200)
                    .json({ message: "Password is successfully resetted" });
                }
              });
            }
          });
        }
      } catch (err) {
        // throw err;
        return res.status(400).json({ error: "Some Error Occured!" });
      }
    }
  });
});
//route for admin dashboard
router.get("/admin/dashboard", authenticate, async (req, res) => {
  // console.log("This is dashboard");
  // send the user information to the frontend to show the data on dashboard
  return res.status(200).json({ user: req.user });
});

//route for student dashboard
router.get("/student/dashboard", authenticate, async (req, res) => {
  // console.log("This is dashboard");
  // send the user information to the frontend to show the data on dashboard
  // console.log(req.user);
  return res.status(200).json({ user: req.user });
});

//route for teacher dashboard
router.get("/teacher/dashboard", authenticate, async (req, res) => {
  // console.log("This is dashboard");
  // send the user information to the frontend to show the data on dashboard
  // console.log(req.user);
  return res.status(200).json({ user: req.user });
});

// route to get all the student under the guidance of a particular teacher
router.get("/teacher/studentUnderGuidance", authenticate, (req, res) => {
  const personalMentor = req.user[0].name;
  // console.log(personalMentor);
  // get student list from the table
  const sql = "select * from student_registration where personal_mentor=?";
  db.query(sql, personalMentor, (err, result) => {
    // console.log(result);
    if (err) {
      // throw err;
      return res.status(400).json("Error occured! Please try again");
    }
    if (!result.length) {
      return res.status(400).json("Error occured! Please try again");
    }
    if (result.length) {
      return res.status(200).json({ result });
    }
  });
});

//route to get all the registered students,teachers and admins
router.get("/admin/registrationDetails", authenticate, async (req, res) => {
  var results = []; //global variable
  // console.log(req.role);
  if (req.role !== "admin") {
    return res.status(400).json({ error: "Do not have proper permission" });
  } else {
    // get all students
    const sql1 =
      "select id,name,email,phone,batch,personal_mentor from student_registration limit 5";
    db.query(sql1, (err, result1) => {
      if (err) {
        //  throw err
        return res.status(400).json({ error: "Error occured" });
      } else {
        // console.log(result1);
        results.push(result1);
        // console.log(results);
        // return res.status(200).json({ result });
      }
    });

    // get all teacher
    const sql2 =
      "select id,name,email,phone,qualification,experience from teacher_registration limit 5";
    db.query(sql2, (err, result2) => {
      if (err) {
        //  throw err
        return res.status(400).json({ error: "Error occured" });
      } else {
        // console.log(result2);
        results.push(result2);
        // console.log(results);
        // return res.status(200).json({ result });
      }
    });

    // get all admins
    const sql3 =
      "select id,name,email,phone from admin_registration where is_super_admin=? limit 5";
    db.query(sql3, 0, (err, result3) => {
      if (err) {
        //  throw err
        return res.status(400).json({ error: "Error occured" });
      } else {
        // console.log(result3);
        results.push(result3);
        // console.log(results);
        // return res.status(200).json({ results });
      }
      // console.log(results);

      // send all the results to the client
      return res.status(200).json({ results });
    });
  }
});

//route to authenticate befor rendering registration pages
router.get(
  "/admin/registrationAuthentication",
  authenticate,
  async (req, res) => {
    // console.log("reached the route");
    // console.log(req.user);
    // console.log(req.role);

    if (
      req.role !== "admin" &&
      req.role !== "student" &&
      req.role !== "teacher"
    ) {
      return res.status(400).json({ error: "Error! Try again" });
    } else {
      return res.status(200).json({ success: "Rendering registration page" });
    }
  }
);

//route for login authentication  .. if user is already logged in then send to dashboard
router.get("/loginAuthentication", authenticate, async (req, res) => {
  // console.log("reached the route");
  // console.log(req.user.length);
  // console.log(req.role);

  if (req.user) {
    // send the role to the client to redirect to correct dashboard
    return res.status(200).json(req.role);
  } else {
    return res.status(400).json({ alert: "Rendering login page" }); //will never encountered the else condition ... user is not present then it authenticate middleawre itself takes care of it.   ...verified
  }
});

//route to store notice in database and sending notice to  email
router.post("/issue-notice", authenticate, (req, res) => {
  let tableName = ""; //global variable
  let emails = []; //global variable to store all the emails
  // allow only teacher and admin to issue a notice  ...double checking  for security purpose
  if (req.role !== "admin" && req.role !== "teacher") {
    return res
      .status(400)
      .json({ error: "Some Error Occured Please Try again" });
  } else if (req.role === "admin" || req.role === "teacher") {
    const { name, email, group, notice_date, subject, notice } = req.body;
    // server side validation     ...what if request is made from postman
    if (!name || !email || !group || !notice_date || !subject || !notice) {
      return res.status(400).json({ error: "Error Occured Please try again" });
    }
    // if everything is fine the store the notice in the database and send email to all members of group
    const sql = "insert into notice_board set ?";

    db.query(sql, req.body, (err1, result1) => {
      // console.log(result.length);    returns undefined ... use only result  not result.length
      if (err1) {
        // throw err1;
        return res
          .status(400)
          .json({ error: "Error Occured Please try again" });
      } else if (!result1) {
        return res
          .status(400)
          .json({ error: "Error Occured Please try again" });
      } else if (result1) {
        //it means notice is successfully stored in the database ... now mail the notice to every group members  ... extract email id based on group
        // console.log(group);

        if (group === "teacher") {
          tableName = "teacher_registration";
        } else if (group === "student") {
          tableName = "student_registration";
        }
        if (group === "teacher" || group === "student") {
          // now retrieve the email from the correct table
          const sql = `select email from ${tableName}`;

          db.query(sql, (err2, result2) => {
            if (err2) {
              // throw err2;
              return res
                .status(400)
                .json({ error: "Error Occured Please try again" });
            } else if (!result2) {
              return res
                .status(400)
                .json({ error: "Error Occured Please try again" });
            } else if (result2) {
              // console.log(result2);
              result2.forEach((item) => {
                emails.push(item.email);
              });
              // console.log(emails);
              // send the mail
              // console.log(subject, notice);
              noticeMailer(emails, subject, notice);
            }
          });
        }

        //  handle commnon group case seperately
        else if (group === "common") {
          const sql1 = "select email from student_registration ";
          db.query(sql1, (err3, result3) => {
            if (err3) {
              throw err3;
              // return res.status(400);
              // // .json({ error: "Error Occured Please try again" });
            } else if (!result3) {
              return res
                .status(400)
                .json({ error: "Error Occured Please try again" });
            } else if (result3) {
              // console.log(result3);
              result3.forEach((item) => {
                emails.push(item.email);
              });
            }
          });
          const sql2 = "select email from teacher_registration ";
          db.query(sql2, (err4, result4) => {
            if (err4) {
              throw err4;
              // return res.status(400);
              // // .json({ error: "Error Occured Please try again" });
            } else if (!result4) {
              return res
                .status(400)
                .json({ error: "Error Occured Please try again" });
            } else if (result4) {
              // console.log(result4);
              result4.forEach((item) => {
                emails.push(item.email);
              });
            }
            // console.log(emails);
            noticeMailer(emails, subject, notice);
          });
          // console.log(emails);    showing empty ... unusual behaviour...why??
        }

        return res.status(200).json({ success: "Notice Issued Successfully" });
      }
    });
  }
});

//route for authentication before rendering the protected routers allow only teacher and admin to reach this route
router.get("/authentication", authenticate, (req, res) => {
  if (!req.user) {
    return res.status(400).json("Some Error Occured! Try again");
  } else if (req.role !== "teacher" && req.role !== "admin") {
    return res.status(400).json("Some Error Occured! Try again");
  } else if (req.user) {
    // console.log(req.user);
    const { name, email } = req.user[0];
    // console.log(name, email);
    return res.status(200).json({
      user: {
        email,
        name,
      },
    });
  }
});

//route for authentication before rendering forget password page
router.get("/common-authentication", authenticate, (req, res) => {
  if (!req.user) {
    return res.status(400).json("Some Error Occured! Try again");
  } else if (
    req.role !== "teacher" &&
    req.role !== "admin" &&
    req.role !== "student"
  ) {
    return res.status(400).json("Some Error Occured! Try again");
  } else if (req.user) {
    // console.log(req.user);
    const { name, email } = req.user[0];
    // console.log(name, email);
    return res.status(200).json({
      user: {
        email,
        name,
      },
    });
  }
});

// route to upload image
router.post("/upload-image", authenticate, async (req, res) => {
  uploadImage(req, res, (err) => {
    if (err) {
      // console.log(err);
      return res.status(400).json({ error: "Larger file Size" });
    } else if (req.file == undefined) {
      return res.status(400).json({ error: "No file selected" });
    } else {
      // console.log(req.file);
      const file = req.file;
      //upload the file on Amazon S3 and store the filename in database
      uploadImageToS3(file)
        .then((uploadResult) => {
          // console.log(uploadResult);
          //store the filename in database
          // get the filename and store it in the data base corresponding to the correct user under correct role
          // console.log(req.role, req.user[0].email);
          const filename = file.filename;
          const email = req.user[0].email;
          const role = req.role;
          let tablename = "";
          // select table based on the role
          if (role === "admin") {
            tablename = "admin_registration";
          } else if (role === "teacher") {
            tablename = "teacher_registration";
          } else if (role === "student") {
            tablename = "student_registration";
          }
          // console.log(filename);
          const sql = `update ${tablename} set image=? where email=?`;
          db.query(sql, [filename, email], async (err, result) => {
            if (err) {
              // throw err;
              return res.status(400).json({ error: "Some Error Occured" });
            } else if (!result) {
              return res.status(400).json({ error: "No file selected" });
            } else if (result) {
              // console.log(result);
              //now delete the file from upload folder
              await unlinkFile(file.path);
              return res
                .status(200)
                .json({ message: "Image Uploaded successfully" });
            }
          });
        })
        .catch((err) => {
          // console.log(err);
          return res.status(400).json({ error: "Some Error Occured" });
        });
    }
  });
});

//route for the career Section
router.post("/career", (req, res) => {
  uploadResume(req, res, async (err) => {
    if (err) {
      // console.log(err);
      //now delete the file from upload folder if error occured
      await unlinkFile(file.path);
      return res.status(400).json({ error: "Larger file Size" });
    } else if (req.query === {} || req.file == undefined) {
      //now delete the file from upload folder if error occured
      await unlinkFile(file.path);
      return res.status(400).json({ error: "Please fill the form properly" });
    } else {
      // console.log(req.query);
      // console.log(req.file);
      const file = req.file;
      // upload file to Amazon s3
      uploadImageToS3(file)
        .then((uploadResult) => {
          const tablename = "career_section";
          const jobData = req.query;
          // console.log(jobData);
          // console.log(uploadResult);
          //store the filename and query string in database
          const filename = file.filename;
          jobData.resume = filename;
          // console.log(jobData);
          // console.log(filename);

          const sql = `insert into ${tablename} set ?`;
          db.query(sql, jobData, async (err, result) => {
            if (err) {
              // throw err;
              //now delete the file from upload folder if error occured
              await unlinkFile(file.path);
              return res.status(400).json({ error: "Some Error Occured" });
            } else if (!result) {
              //now delete the file from upload folder if error occured
              await unlinkFile(file.path);
              return res.status(400).json({ error: "Some error occured" });
            } else if (result) {
              // console.log(result);
              //now delete the file from upload folder
              await unlinkFile(file.path);
              //send mail
              jobMailer(req.query.email, req.query.name);
              return res.status(200).json({
                message: "Successfully Applied for the job! Check Your mail",
              });
            }
          });
        })
        .catch(async (err) => {
          // console.log(err);
          //now delete the file from upload folder
          await unlinkFile(file.path);
          return res.status(400).json({ error: "Some Error Occured" });
        });
    }
  });
});

//route to get the job application data
router.get("/admin/job-application", authenticate, (req, res) => {
  // console.log(req.role);
  if (req.role !== "admin") {
    return res.status(400).json({ error: "Do not have proper permission" });
  } else {
    // get all job application
    const sql = "select * from career_section";
    db.query(sql, (err, result) => {
      if (err) {
        //  throw err
        return res.status(400).json({ error: "Error occured" });
      } else {
        // console.log(result);
        return res.status(200).json({ result });
      }
    });
  }
});
// route for logout
router.get("/logout", authenticate, (req, res) => {
  // console.log("reaching to logout route");
  res.clearCookie("accessToken");
  res.status(200).json({ success: "Logged out successfully" });
});

module.exports = router;
