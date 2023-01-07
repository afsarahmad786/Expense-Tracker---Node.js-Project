const User = require("../models/user");

exports.register = (req, res, next) => {
  console.log(req.body);
  User.create({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
  })
    .then((result) => {
      // console.log(result);

      res.json({
        message: "User Registered Successfully",
        success: true,
        data: result,
      });
    })
    .catch((err) => {
      res.json({ message: err.errors[0]["message"], success: false });
    });
};

exports.login = (req, res, next) => {
  const password = req.body.password;
  const email = req.body.email;
  User.findOne({ where: { email: email } })
    .then((result) => {
      if (result.password == password) {
        res.json({
          message: "User Logged in Successfully",
          success: true,
          status: 200,
          data: result,
        });
      } else {
        res.json({
          message: "User Not Authorized",
          status: 401,
          success: false,
          // data: [],
        });
      }
    })
    .catch((err) => {
      // res.json(err);

      res.json({
        message: "User Not Found",
        status: 404,
        success: false,
      });
      res.end();
    });
};
