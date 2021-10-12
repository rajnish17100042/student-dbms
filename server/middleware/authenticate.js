const jwt = require("jsonwebtoken");
// requiring database connection
const db = require("../db/conn");
const secretKey = process.env.SECRET_KEY;

const authenticate = async (req, res, next) => {
  let tableName = ""; // global variable
  // console.log("inside authenticate function");

  try {
    //   get the access token from the cookie
    // console.log("inside try block of authenticate middleware");
    // console.log(req);
    const token = req.cookies.accessToken;
    // console.log(token);

    // let's verify the token and get the user details
    const verifyToken = jwt.verify(token, secretKey);
    // console.log(verifyToken);

    // //now check in the database if the user is present with the valid role
    let { email, password, role } = verifyToken.payload;

    // just check the role only admin and is allowed to register the student  as per the project requirement
    // if (role !== "admin") {
    //   //   console("inside contidion checking for role");
    //   return res.status(400).json("Don't have permission to register");
    // }

    // console.log(email, password, role);
    // now based on the role choose the table for teacher or admin
    if (role === "student") {
      tableName = "student_registration";
    } else if (role === "teacher") {
      tableName = "teacher_registration";
    } else if (role === "admin") {
      tableName = "admin_registration";
    }

    const sql = `select name,email,phone from ${tableName} where email=? and password=? `;
    db.query(sql, [email, password], (err, result) => {
      if (err) {
        throw err;
      }
      // console.log(result);

      if (!result.length) {
        // means authentication failed
        // console.log("inside condition checking for result length");
        return res.status(400).json("Something is missing");
      }
      //if everything is fine then call next function which will do the registration process
      // console.log(req);
      req.user = result; //explicitly adding user property to req object ... so that we can use it in other get routes after authentication
      req.role = role;
      next();
    });
  } catch (err) {
    // console.log(err);
    res.status(400).json("something is missing");
  }
};

// export the authenticate function so that wew can use it in other file also
module.exports = authenticate;
