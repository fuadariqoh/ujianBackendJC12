const { db } = require("../connection");

module.exports = {
  getInventory: (req, res) => {
    let sql = `select i.inventory_id,p.nama,s.branch_name,i.inventory from inventory i 
    join store s on i.store_id=s.store_id
    join product p on i.store_id=p.product_id `;
    db.query(sql, (err, result) => {
      if (err) res.status(500).send(err);
      return res.status(200).send(result);
    });
  },
  addInventory: (req, res) => {
    let sql = `insert into inventory set ?`;
    db.query(sql, req.body, (err, result) => {
      if (err) res.status(500).send(err);
      let sql = `select i.inventory_id,p.nama,s.branch_name,i.inventory from inventory i 
        join store s on i.store_id=s.store_id
        join product p on i.store_id=p.product_id `;
      db.query(sql, (err1, result1) => {
        if (err) res.status(500).send(err1);
        return res.status(200).send(result1);
      });
    });
  },
  editInventory: (req, res) => {
    let { id } = req.params;
    let sql = `update inventory set ? where inventory_id = ${id}`;
    db.query(sql, req.body, (err, result) => {
      if (err) res.status(500).send(err);
      sql = `select i.inventory_id,p.nama,s.branch_name,i.inventory from inventory i 
        join store s on i.store_id=s.store_id
        join product p on i.store_id=p.product_id where inventory_id=${id} `;
      db.query(sql, (err1, result1) => {
        if (err) res.status(500).send(err1);
        return res.status(200).send(result1);
      });
    });
  },
  deleteInventory: (req, res) => {
    const { id } = req.params;
    let sql = `delete from inventory where id_inventory=${id}`;
    db.query(sql, (err, result) => {
      if (err) res.status(500).send(err);
      return res.status(200).send(result);
    });
  },
};
