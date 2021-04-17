const router = require("express").Router();
const transaction = require("../models/transaction.js");

router.post("/api/transaction", ({ body }, res) => {
  transaction
    .create(body)
    .then((dbtransaction) => {
      res.json(dbtransaction);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.post("/api/transaction/bulk", ({ body }, res) => {
  transaction
    .insertMany(body)
    .then((dbtransaction) => {
      res.json(dbtransaction);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.get("/api/transaction", (req, res) => {
  transaction
    .find({})
    .sort({ date: -1 })
    .then((dbtransaction) => {
      res.json(dbtransaction);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

module.exports = router;
