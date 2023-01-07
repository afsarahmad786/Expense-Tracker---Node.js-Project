const btn = document.getElementById("lgn");
const mesage = document.getElementById("msg");
const msg = document.getElementsByClassName("user-not-found");

// const name = document.getElementById("name").value;
btn.addEventListener("click", function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  axios
    .post("http://127.0.0.1:3000/login", {
      email: email,
      password: password,
    })
    .then((response) => {
      const messages = response.data["message"];
      const suc = response.data["success"];
      if (suc == true) {
        alert(messages);
      } else {
        alert(messages);
      }
      // mesage.innerHTML = "Success";
      // console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});
