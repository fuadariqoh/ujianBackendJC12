const { db } = require("../connection");
const { uploader } = require("../supports/uploader");
const fs = require("fs");

module.exports = {
  getProduct: (req, res) => {
    var sql = `select * from product`;
    db.query(sql, (err, result) => {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    });
  },
  addProduct: (req, res) => {
    try {
      //   console.log("tes");
      const path = "/foto"; // ini bebas nama pathnya
      const upload = uploader(path, "TES").fields([{ name: "image" }]);
      console.log("tes2");
      upload(req, res, (err) => {
        console.log("tes2");
        if (err) {
          res.status(500).json({ message: "upload picture failed" });
        }
        console.log("UDAH TERUPLOAD");
        const { image } = req.files;
        const imagePath = image ? path + "/" + image[0].filename : null;
        // req.body.imagePath = imagePath;
        const data = JSON.parse(req.body.data);
        // console.log(req.body.imagePath);
        data.imagePath = imagePath;

        sql = "insert into product set ?";
        db.query(sql, data, (err, result) => {
          if (err) {
            fs.unlinkSync("./public" + imagePath);
            return res.status(500).json({
              message: "there was an error",
            });
          }
          sql = "select * from product";
          db.query(sql, (err1, result1) => {
            if (err) res.status(500).send(err);
            return res.status(200).send(result1);
          });
        });
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  editProduct: (req, res) => {
    // console.log("tes");
    const { id } = req.params;
    let sql = `select * from product where product_id = ${id}`;
    db.query(sql, (err, result) => {
      console.log(result.length);
      if (err) res.status(500).send(err);
      if (result.length) {
        try {
          const path = "/foto"; // ini bebas nama pathnya
          const upload = uploader(path, "TES").fields([{ name: "image" }]);
          upload(req, res, (err) => {
            if (err) {
              console.log("tes error");
              return res
                .status(500)
                .json({ message: "upload post picture failed" });
            }
            console.log("FOTO SUDAH TERUPLOAD");
            const { image } = req.files;
            const imagePath = image ? path + "/" + image[0].filename : null;
            const data = JSON.parse(req.body.data);
            if (imagePath) {
              data.imagePath = imagePath;
            }
            sql = `update product set ? where product_id = ${id}`;
            db.query(sql, data, (err1, result1) => {
              console.log(data);
              if (err1) {
                if (imagePath) {
                  fs.unlinkSync("./public" + imagePath);
                }
                // return res
                //   .status(500)
                //   .json({ message: "there was an error on the server" });
              }
              if (imagePath) {
                // hapus foto lama
                console.log(result[0]);
                if (result[0].imagePath) {
                  fs.unlinkSync("./public" + result[0].imagePath);
                }
              }
              sql = `select * from product where product_id = ${id} `;
              db.query(sql, (err2, result2) => {
                if (err2) res.status(500).send(err2);
                return res.status(200).send(result2);
              });
            });
          });
        } catch (error) {
          return res.status(500).send(error);
        }
      }
    });
  },
  deleteProduct: (req, res) => {
    const { id } = req.params;
    let sql = `delete product where product_id=${id}`;
    db.query(sql, (err, result) => {
      if (err) res.status(500).send(err);
      return res.status(200).send(result);
    });
  },
};
