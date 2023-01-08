const Expense = require("../models/expense");
exports.add = async (req, res, next) => {
  const { amount, description, category } = req.body;

  Expense.create({
    amount: amount,
    description: description,
    category: category,
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
  Expense.findAll()
    .then((response) => {
      res.json({ data: response });
    })
    .catch((err) => console.log(err));

  // console.log(res.json({ data: req.body }));
};
