const mysql = require("mysql");
const format = require("../utils/formatDate");
const dotenv = require("dotenv");

dotenv.config();

const db_config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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

const postRequest = (data) => {
  connection.query(
    `INSERT INTO requests (email, name, from_city, to_city, weight, volume, cost, distance, phone, comment, time) VALUES ("${
      data.mail
    }", "${data.name}", "${data.from}", "${data.to}", "${data.weight}", "${
      data.volume
    }", "${data.cost}", "${data.distance}", "${data.phone}", "${
      data.comment
    }", "${format.formatDate(new Date())}")`,
    function (error) {
      if (error) {
        console.log("Возникла ошибка: ", error);
      }
      console.log("Заявка добавлена в бд.");
    }
  );
};

const postSub = async (data) => {
  const dataSub = await checkUnique(data.mail);
  const isUnique = dataSub.length == 0;
  if (isUnique) {
    connection.query(
      `INSERT INTO subs (email, name, time) VALUES ("${data.mail}", "${
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

const postCall = async (data) => {
  const dataCall = await checkUniquePhone(data.phone);
  const isUnique = dataCall.length == 0;
  if (isUnique) {
    connection.query(
      `INSERT INTO calls (phone, name, time) VALUES ("${data.phone}", "${
        data.name
      }", "${format.formatDate(new Date())}")`,
      function (error) {
        if (error) {
          console.log("Возникла ошибка: ", error);
        }
        console.log("Заявка на звонок добавлена в бд.");
      }
    );
  } else {
    console.log("Пользователь уже имеет заявку на звонок");
  }
};

const checkUniquePhone = async (phone) => {
  return new Promise((res, rej) => {
    connection.query(
      `SELECT * FROM calls WHERE phone = "${phone}"`,
      (error, results) => {
        if (error) {
          console.log("Возникла ошибка: ", error);
          rej(error);
        }
        console.log("Проверка на уникальность телефона успешно пройдена.");
        res(results);
      }
    );
  });
};

const checkUnique = async (email) => {
  return new Promise((res, rej) => {
    connection.query(
      `SELECT * FROM subs WHERE email = "${email}"`,
      function (error, results) {
        if (error) {
          console.log("Возникла ошибка: ", error);
          rej(error);
        }
        console.log("Проверка на уникальность успешно пройдена.");
        res(results);
      }
    );
  });
};

const getRequests = async () => {
  return new Promise((res, rej) => {
    connection.query(`SELECT * FROM requests`, (err, results) => {
      if (err) {
        console.log("Ошибка во время получения заявок.");
        rej(err);
      }
      console.log("Заявки успешно получены.");
      res(results);
    });
  });
};

const getSubs = async () => {
  return new Promise((res, rej) => {
    connection.query(`SELECT * FROM subs`, (err, results) => {
      if (err) {
        console.log("Ошибка во время получения заявок на рассылку.");
        rej(err);
      }
      console.log("Заявки на рассылку успешно получены.");
      res(results);
    });
  });
};

const getCalls = async () => {
  return new Promise((res, rej) => {
    connection.query(`SELECT * FROM calls`, (err, results) => {
      if (err) {
        console.log("Ошибка во время получения заявок на звонок.");
        rej(err);
      }
      console.log("Заявки на звонок успешно получены.");
      res(results);
    });
  });
};

const deleteSubById = async (id) => {
  connection.query(`DELETE FROM subs WHERE id = "${id}"`, (err) => {
    if (err) {
      console.log("Ошибка удаления подписчика.");
    }
    console.log("Удаление подписчика успешно завершено.");
  })
}

const deleteRequestById = async (id) => {
  connection.query(`DELETE FROM requests WHERE id = "${id}"`, (err) => {
    if (err) {
      console.log("Ошибка удаления зявки.");
    }
    console.log("Удаление заявки успешно завершено.");
  })
}

const deleteCallById = async (id) => {
  connection.query(`DELETE FROM calls WHERE id = "${id}"`, (err) => {
    if (err) {
      console.log("Ошибка удаления зявки на звонок.");
    }
    console.log("Удаление заявки на звонок успешно завершено.");
  })
}

module.exports = {
  postRequest,
  postSub,
  handleDisconnect,
  getRequests,
  getSubs,
  deleteSubById,
  deleteRequestById,
  postCall,
  deleteCallById,
  getCalls,
};
