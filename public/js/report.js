// document.addEventListener("DOMContentLoaded", () => {
//   const token = localStorage.getItem("token");

//   axios
//     .get("http://127.0.0.1:3000/report", {
//       headers: { Authorization: token },
//     })
//     .then((res) =>
//       // showLeaderboard(res.data)
//       console.log(res)
//     )
//     .catch((err) => console.error(err));
// });
// function showLeaderboard(res) {
//   res.data.forEach(addboard);
// }

// function addboard(item) {
//   console.log(item);
//   // console.log(item);
//   const ul = document.getElementById("board-item");

//   const di = document.createElement("li");
//   di.innerText =
//     "Name : " + item.user.name + " Total Expense: " + item.total_amount;

//   ul.append(di);
// }
const btn = document.getElementById("downloadd");

btn.addEventListener("click", function () {
  alert("Download Successfully");
});
