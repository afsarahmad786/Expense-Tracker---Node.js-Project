const Expense = require("../models/expense");
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
  console.log(req.user.id);

  Expense.findAll({ where: { userId: req.user.id } })
    .then((response) => {
      console.log(response);

      res.json({ data: response });
    })
    .catch((err) => console.log(err));

  // console.log(res.json({ data: req.body }));
};
