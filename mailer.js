const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "sneaker.paradise.mail@gmail.com", // generated ethereal user
    pass: "iwojrewxqujmdazd", // generated ethereal password
  },
});

transporter.verify().then(() => {
  console.log("Ready for send emails");
});

module.exports = transporter;
