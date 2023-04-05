const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

app.post("/send-email", (req, res) => {
  const { email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "Mail.ru",
    auth: {
      user: "nevzor1000@mail.ru",
      pass: "d0am7jENSNv31FzX4r8H",
    },
  });
  const mailOptions = {
    from: "nevzor1000@mail.ru",
    to: "nevzor1000@mail.ru",
    subject: subject,
    text: message + `\nПочта: ${email}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Ошибка отправки письма");
    } else {
      console.log("Письмо успешно отправлено: " + info.response);
      res.send("Письмо успешно отправлено");
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
