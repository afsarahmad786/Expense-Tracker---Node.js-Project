const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const User = require("./models/user");
const userRoutes = require("./routes2/user");
const expenseRoutes = require("./routes2/expense");
const paymentRoutes = require("./routes2/payment");
const Expense = require("./models/expense");
const Order = require("./models/order");
var cors = require("cors");

const app = express();

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "js")));
app.use(userRoutes);
app.use(expenseRoutes);
app.use(paymentRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    console.log(result);
    app.listen(3000);
  })

  // console.log(user);
  .catch((err) => {
    console.log(err);
  });
