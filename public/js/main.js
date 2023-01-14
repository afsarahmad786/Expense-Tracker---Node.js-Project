document.getElementById("expens").addEventListener("click", function () {
  const amount = document.getElementById("amount").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const token = localStorage.getItem("token");
  axios
    .post(
      "http://127.0.0.1:3000/expense",

      {
        amount: amount,
        description: description,
        category: category,
      },
      { headers: { Authorization: token } }
    )
    .then((response) => {
      const messages = response.data["message"];
      const suc = response.data["success"];
      location.reload();
      if (suc == true) {
        alert(messages);
      } else {
        alert(messages);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  axios
    .get("http://127.0.0.1:3000/expense", {
      headers: { Authorization: token },
    })
    .then((res) => showOutput(res.data))
    .catch((err) => console.error(err));
});
function showOutput(res) {
  res.data.forEach(additem);
}
function additem(item) {
  console.log(item);
  if (item.user.ispremium) {
    document.getElementById("premium-feature").innerHTML = " premium user ";
    document.getElementById("premium-feature").style.fontSize = "25px";
    document.getElementById("pay-button").style.visibility = "hidden";
  }

  const itemid = item.id;
  const amnt = item.amount;
  const cat = item.category;
  const des = item.description;

  const sections = document.getElementById("sections");
  const row = document.createElement("div");
  row.className = "row";

  const div2 = document.createElement("div");
  div2.className = "col";
  row.appendChild(div2);

  const div3 = document.createElement("div");
  div3.className = "col";
  row.appendChild(div3);

  const div4 = document.createElement("div");
  div4.className = "col";
  row.appendChild(div4);

  const div5 = document.createElement("div");
  div5.className = "col";
  row.appendChild(div5);

  const amount = document.createElement("p");
  amount.className = "amount";
  amount.innerText = amnt;

  const description = document.createElement("p");
  description.className = "description";
  description.innerText = des;

  const category = document.createElement("p");
  category.innerText = cat;
  category.className = "category";

  const button = document.createElement("button");
  button.innerText = "Delete";
  button.className = "btn btn-danger";
  button.id = des + itemid;
  button.setAttribute("onclick", `del(${des + itemid})`);

  sections.appendChild(row);
  div2.append(amount);
  div3.append(description);
  div4.append(category);
  div5.append(button);
}

function del(item) {
  const token = localStorage.getItem("token");

  const id = item.id.slice(-1);
  console.log(id);
  axios
    .delete("http://127.0.0.1:3000/expense/" + id, {
      headers: { Authorization: token },
    })
    .then((res) => {
      const messages = res.data["message"];
      alert(messages);
      location.reload();
    })
    .catch((err) => console.error(err));
}

document.getElementById("pay-button").onclick = async function (e) {
  const token = localStorage.getItem("token");
  const response = await axios.get("http://127.0.0.1:3000/buypremium", {
    headers: { Authorization: token },
  });
  var options = {
    key: response.data.key_id,
    order_id: response.data.order.id,
    handler: async function (response) {
      await axios.post(
        "http://127.0.0.1:3000/updateordertransaction",
        { orderId: options.order_id, paymentId: response.razoray_payment_id },
        {
          headers: { Authorization: token },
        }
      );
      // document.getElementById("pay-button").style.visibility = "hidden";
      // document.getElementById("premium-feature").innerHTML =
      //   "You're Premium user now";
      // document.getElementById("premium-feature").style.fontSize = "200px";
      alert("you are premium");
      location.reload();
    },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on("payment.failed", function () {
    alert("something went wrong");
  });
};

document.getElementById("leaderboard").onclick = async function (e) {
  const token = localStorage.getItem("token");

  axios
    .get("http://127.0.0.1:3000/leaderboard", {
      headers: { Authorization: token },
    })
    .then(
      (res) => showLeaderboard(res.data)
      // console.log(res)
    )
    .catch((err) => console.error(err));
};
function showLeaderboard(res) {
  document.getElementById("li-header").innerHTML = "LeaderBoard";
  res.data.forEach(addboard);
}

function addboard(item) {
  console.log(item);
  const ul = document.getElementById("board-item");

  const di = document.createElement("li");
  di.innerText =
    "Name : " + item.user.name + " Total Expense: " + item.total_amount;

  ul.append(di);
}
