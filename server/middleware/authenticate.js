const jwt = require("jsonwebtoken");
// requiring database connection
const db = require("../db/conn");
const secretKey = process.env.SECRET_KEY;

const authenticate = async (req, res, next) => {
  let tableName = "";
  // console.log("inside authenticate function");

  try {
    //   get the access token from the cookie
    console.log("inside try block of authenticate middleware");
    // console.log(req);
    const token = req.cookies.accessToken;
    // console.log(token);

    // let's verify the token and get the user details
    const verifyToken = jwt.verify(token, secretKey);
    console.log(verifyToken);

    // //now check in the database if the user is present with the valid role
    const { email, password, role } = verifyToken.payload;

    console.log(email, password, role);
    // now based on the role choose the table for student,teacher or admin
    if (role === "student") {
      tableName = "student_registration";
    } else if (role === "teacher") {
      tableName = "teacher_registration";
    } else if (role === "admin") {
      tableName = "admin_registration";
    }

    const sql = `select email from ${tableName} where email=? and password=? `;
    db.query(sql, [email, password], (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result);
    });
    // // console.log(rootUser);

    // req.token = token;
    // req.rootUser = rootUser;
    // req.userId = rootUser._id;

    // if (!rootUser) {
    //   return res.send.json(401)("No user found in the database");
    // }

    // // console.log("user exist in the database");

    // // if everything is fine then call next function which will send user data to frontend
    // next();
  } catch (err) {
    // console.log(err);
    res.status(401).json("Authentication failed: No user found");
  }
};

// export the authenticate function so that wew can use it in other file also
module.exports = authenticate;
