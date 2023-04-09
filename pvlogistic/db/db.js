const mysql = require("mysql");
const format = require("../utils/formatDate");

const db_config = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "pvlogistic",
};
let connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config);

  connection.connect(function (err) {
    if (err) {
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  connection.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

const postRequest = (subject, message, email) => {
  connection.query(
    `INSERT INTO requests (email, title, text, time) VALUES ("${email}", "${subject}", "${message}", "${format.formatDate(
      new Date()
    )}")`,
    function (error) {
      if (error) {
        console.log("Возникла ошибка: ", error);
      }
      console.log("Заявка добавлена в бд.");
    }
  );
};

const postSub = async (email, data) => {
  const dataSub = await checkUnique(email);
  const isUnique = dataSub.length == 0;
  if (isUnique) {
    connection.query(
      `INSERT INTO subs (email, name, time) VALUES ("${email}", "${
        data.name
      }", "${format.formatDate(new Date())}")`,
      function (error) {
        if (error) {
          console.log("Возникла ошибка: ", error);
        }
        console.log("Заявка на рассылку добавлена в бд.");
      }
    );
  } else {
    console.log("Пользователь уже подписан на рассылку");
  }
};

const checkUnique = async (email) => {
  return new Promise((res, rej) => {
    connection.query(
      `SELECT * FROM subs WHERE email = "${email}"`,
      (error, results) => {
        if (error) {
          console.log("Возникла ошибка: ", error);
          rej(err);
        }
        console.log("Проверка на уникальность успешно пройдена.");
        res(results);
      }
    );
  });
};

module.exports = {
  postRequest,
  postSub,
  handleDisconnect,
};
