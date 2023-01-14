const Expense = require("../models/expense");
const User = require("../models/user");
const sequelize = require("sequelize");
exports.add = async (req, res, next) => {
  const { amount, description, category } = req.body;
  Expense.create({
    amount: amount,
    description: description,
    category: category,
    userId: req.user.id,
  })
    .then((result) => {
      res.json({
        message: "Expense Added Successfully",
        success: true,
        data: result,
      });
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.list = async (req, res, next) => {
  Expense.findAll({ where: { userId: req.user.id }, include: User })
    .then((response) => {
      console.log(response);
      res.json({ data: response });
    })
    .catch((err) => console.log(err));
  // console.log(res.json({ data: req.body }));
};

exports.deleteitem = async (req, res, next) => {
  console.log(req.params.id);

  Expense.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((response) => {
      res.status(200).json({ message: "Deleted successfully" });

      // res.json({ data: response });
    })
    .catch((err) => console.log(err));

  // console.log(res.json({ data: req.body }));
};

exports.leaderboards = async (req, res, next) => {
  Expense.findAll({
    include: User,
    // order: [
    //   ["amount", "DESC"],
    //   // ["userId", "DESC"],
    // ],
    // Will order by max(age)
    attributes: [
      "userId",
      [sequelize.fn("SUM", sequelize.col("amount")), "total_amount"],
    ],
    group: ["userId"],
  })
    .then((response) => {
      console.log(response);
      res.json({ data: response });
    })
    .catch((err) => console.log(err));
};

// exports.leaderboards
