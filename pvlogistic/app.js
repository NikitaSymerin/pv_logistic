const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const http = require("http");
const cors = require("cors");
const db = require("./db/db");
const app = express();
const server = http.createServer(app);
const jwt = require("jsonwebtoken");

app.set("view engine", "ejs");
app.use(express.static("./assets"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

const port = 3000;
(function run() {
  server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
  });
})();

app.get("/", express.json(), (req, res) => {
  res.render("../assets/index");
});
app.get("/about", express.json(), (req, res) => {
  res.render("../assets/about");
});
app.get("/admin", express.json(), (req, res) => {
  res.render("../assets/admin");
});
app.post("/admin/auth", express.json(), (req, res) => {
  const { login, password } = req.body;

  if (login == "admin" && password == "admin") {
    res.status(200).json({
      message: "Вы успешно вошли в админ панель.",
      token: jwt.sign({ login: login, password: password }, "pvlogistic", {
        algorithm: "RS256",
      }),
    });
    console.log("Произошёл вход в админку.");
  }
  res.status(500).message("Не удалось войти в админку.");
  console.log("Неудачный вход в админку.");
});
app.post("/send-email", (req, res) => {
  const { subscribed, email, subject, message, data } = req.body;

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
  db.handleDisconnect();
  db.postRequest(subject, message, email);
  if (subscribed) db.postSub(email, data);
});
