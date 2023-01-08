document.getElementById("expens").addEventListener("click", function () {
  const amount = document.getElementById("amount").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;

  axios
    .post("http://127.0.0.1:3000/expense", {
      amount: amount,
      description: description,
      category: category,
    })
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
  axios
    .get("http://127.0.0.1:3000/expense", {
      timeout: 5000,
    })
    .then((res) => showOutput(res.data))
    .catch((err) => console.error(err));
});
function showOutput(res) {
  res.data.forEach(additem);
}
function additem(item) {
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
  button.id = itemid;

  sections.appendChild(row);
  div2.append(amount);
  div3.append(description);
  div4.append(category);
  div5.append(button);
}
