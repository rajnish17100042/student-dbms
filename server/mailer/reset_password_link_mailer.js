var nodemailer = require("nodemailer");
const user = process.env.GMAIL_USER_ID;
const password = process.env.GMAIL_PASSWORD;
// console.log(user, password);
const resetPasswordLinkMailer = async (email, resetPasswordLink) => {
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
    subject: "Reset Your Password",
    html: `Please Click on the this ${resetPasswordLink} to reset your password`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

// export mailer function so that we can  use it in other file
module.exports = resetPasswordLinkMailer;
