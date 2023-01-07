const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const User = require("./models/user");
const userRoutes = require("./routes2/user");
console.log(userRoutes);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(userRoutes);

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
