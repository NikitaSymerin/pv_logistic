const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const http = require("http");
const cors = require("cors");
const db = require("./db/db");
const dotenv = require("dotenv");
const app = express();
const server = http.createServer(app);
const jwt = require("jsonwebtoken");

dotenv.config();

const PORT = process.env.PORT ?? 3000;

app.set("view engine", "ejs");
app.use(express.static("./assets"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.HOST,
  })
);

(function run() {
  server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
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

app.get("/admin/panel", express.json(), async (req, res) => {
  db.handleDisconnect();
  const requests = await db.getRequests();
  const subs = await db.getSubs();
  res.render("../assets/admin_panel", { requests: JSON.parse(JSON.stringify(requests)), subs: JSON.parse(JSON.stringify(subs)) });
});

app.post("/admin/auth", (req, res) => {
  const { login, password } = req.body;
  const accessToken = jwt.sign(
    { login: login, password: password },
    process.env.PRIVATE_KEY,
    {
      algorithm: "HS256",
    }
  );

  if (
    login == process.env.ADMIN_LOGIN &&
    password == process.env.ADMIN_PASSWORD
  ) {
    console.log("Произошёл вход в админку.");
    return res.status(200).json({
      message: "Вы успешно вошли в админ панель.",
      token: accessToken,
    });
  }
  console.log("Неудачный вход в админку.");
  res.status(500).json({ message: "Не удалось войти в админку." });
});

app.post("/send-email", (req, res) => {
  const { subscribed, message, data } = req.body;

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
    subject: "Заявка с сайта" + process.env.HOST,
    text: message + `\nПочта: ${data.mail}`,
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
  db.postRequest(data);
  if (subscribed) db.postSub(data);
});

app.post("/postsub", (req, res) => {
  const { data } = req.body;

  db.handleDisconnect();
  try {
    db.postSub(data);
    res.status(200).json({
      message: "Спасибо за подписку!",
    });
  } catch {
    res.status(500).json({
      message: "Произошла ошибка",
    });
  }
});

app.delete("/admin/panel/deletesub", (req, res) => {
  const { id } = req.body;

  db.handleDisconnect();
  db.deleteSubById(id);
})

app.delete("/admin/panel/deleterequest", (req, res) => {
  const { id } = req.body;

  db.handleDisconnect();
  db.deleteRequestById(id);
})