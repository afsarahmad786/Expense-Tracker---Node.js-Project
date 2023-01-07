const User = require("../models/user");

exports.register = (req, res, next) => {
  User.create({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
  })
    .then((result) => {
      // console.log(result);

      res.json({ message: "Success", data: result });
    })
    .catch((err) => {
      res.json(err.errors[0]["message"]);
    });
};
