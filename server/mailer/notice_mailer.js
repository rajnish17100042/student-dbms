var nodemailer = require("nodemailer");
const user = process.env.GMAIL_USER_ID;
const password = process.env.GMAIL_PASSWORD;
// console.log(user, password);
const noticeMailer = async (emails, subject, notice) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass: password,
    },
  });

  var mailOptions = {
    from: "studentdbms2021@gmail.com",
    to: emails,
    subject: subject,
    text: notice,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
// const message = noticeMailer("rajnish17100042@gmail.com").catch(
//   console.error
// );
// console.log(message);

// export mailer function so that we can  use it in other file
module.exports = noticeMailer;
