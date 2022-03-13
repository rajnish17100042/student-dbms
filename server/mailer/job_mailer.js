var nodemailer = require("nodemailer");
const user = process.env.YAHOO_USER_ID;
const password = process.env.YAHOO_PASSWORD;
// console.log(user, password);
const jobMailer = async (emails, name) => {
  var transporter = nodemailer.createTransport({
    host: "smtp.bizmail.yahoo.com",
    port: 587,
    service: "yahoo",
    secure: true,
    auth: {
      user,
      pass: password,
    },
    debug: false,
    logger: true,
  });

  var mailOptions = {
    from: "rajnishpatel203@yahoo.com",
    to: emails,
    subject: "Thanks For apply for the Job",
    html: `Dear <strong>${name}</strong>/><p>Thank you for applying for the Job.</p><p>We are reviewing your resume</p><p>We will get back to you very soon</p><br/>Rajnish Patel<br/>Admin`,
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
module.exports = jobMailer;
