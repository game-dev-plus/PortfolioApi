/**
 * Update technologycategory using idtechnologycategory
 * Param : idtechnologycategory, technologycategoryname
 * ParamType : int, string
 * RequestType : PUT
 * RequestOn : Body
 */

const pool = require("../../config").pool;
const express = require("express");
const router = express.Router();
var logger = require("../../logger").Logger;

router.put("/", (req, res) => {
  var idtechnologycategory = req.body.idtechnologycategory;
  var technologycategoryname = req.body.technologycategoryname;

  pool.getConnection(function(err, connection) {
    if (err) {
      logger.error(
        "CONNECTION POOL ERROR : /api/update/technologycategory : " + err
      );
      res.status(500).send(JSON.stringify({ error: "DB_CONNECTION_ERROR" }));
      return;
    }
    connection.query(
      "UPDATE `technologycategory` SET `technologycategoryname`=? WHERE `idtechnologycategory`=?",
      [([technologycategoryname], [idtechnologycategory])],
      function(error, results, fields) {
        connection.release();
        if (error) {
          logger.error("/api/update/technologycategory : " + error);
          res.status(500).send(JSON.stringify(error.code));
        } else {
          res.status(200).send(results);
        }
      }
    );
  });
});

module.exports = router;
