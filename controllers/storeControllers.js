const { db } = require("../connection");

module.exports = {
  getStore: (req, res) => {
    let sql = `select * from store`;
    db.query(sql, (err, result) => {
      if (err) res.status(500).send(err);
      return res.status(200).send(result);
    });
  },
  addStore: (req, res) => {
    let sql = `insert into store set ?`;
    console.log(req.body);
    db.query(sql, req.body, (err, result) => {
      if (err) res.status(500).send(err);
      sql = `select * from store `;
      db.query(sql, (err, result1) => {
        if (err) res.status(500).send(err);
        return res.status(200).send(result1);
      });
    });
  },
  editStore: (req, res) => {
    const { id } = req.params;
    let sql = `update store set ? where store_id=${id}`;
    db.query(sql, req.body, (err, result) => {
      if (err) res.status(500).send(err);
      sql = `select * from store where store_id=${id}`;
      db.query(sql, (err1, result1) => {
        if (err1) res.status(500).send(err);
        return res.status(200).send(result1);
      });
    });
  },
  deleteStore: (req, res) => {
    const { id } = req.params;
    let sql = `select * from store where store_id=${id}`;
    db.query(sql, (err, result) => {
      if (err) res.status(500).send(err);
      if (result.length) {
        sql = `delete from store where store_id= ${id}`;
        db.query(sql, (err1, result1) => {
          if (err) res.status(500).send(err);
          return res.status(200).send(result1);
        });
      }
    });
  },
};
