var nodemailer = require("nodemailer");
const user = process.env.GMAIL_USER_ID;
const password = process.env.GMAIL_PASSWORD;
// console.log(user, password);
const passwordMailer = async (email, name) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass: password,
    },
  });

  var mailOptions = {
    from: "studentdbms2021@gmail.com",
    to: email,
    subject: "Login credentials ",
    html: `Welcome <strong>${name}! </strong>your are registerd for the course you applied! <p>Your one time password is test@123.</p> <p>Login to the website <a href="https://student-database-management1.herokuapp.com/login">here</a> and change your password immediately.</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
// const message = passwordMailer("rajnish17100042@gmail.com").catch(
//   console.error
// );
// console.log(message);

// export mailer function so that we can  use it in other file
module.exports = passwordMailer;
