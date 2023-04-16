if (localStorage.getItem("pvlogistic_admin_token")) {
  window.location.href = "./admin/panel";
}

async function Auth() {
  const login = document.getElementById("login").value;
  const password = document.getElementById("pass").value;

  const res = await fetch("./admin/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify({
      login: login,
      password: password,
    }),
  }).then((res) => res.json());
  if (!res.token) console.log("Вход не удался");
  else {
    localStorage.setItem("pvlogistic_admin_token", res.token);
    window.location.href = "./admin/panel";
  }
}
