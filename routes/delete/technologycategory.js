/**
 * Delete a specific technologycategory using idtechnologycategory parameter
 * Param : idtechnologycategory
 * ParamType : int
 * RequestType : Delete
 * RequestOn : Query
 */

const pool = require("../../config").pool;
const express = require("express");
const router = express.Router();
var logger = require("../../logger").Logger;

router.delete("/", (req, res) => {
  var idtechnologycategory = req.query.idtechnologycategory;

  pool.getConnection(function(err, connection) {
    if (err) {
      logger.error(
        "CONNECTION POOL ERROR : /api/delete/technologycategory : " + err
      );
      res.status(500).send(JSON.stringify({ error: "DB_CONNECTION_ERROR" }));
      return;
    }
    connection.query(
      "delete from `technologycategory` where `idtechnologycategory`=?)",
      [idtechnologycategory],
      function(error, results, fields) {
        connection.release();
        if (error) {
          logger.error("/api/delete/technologycategory : " + error);
          res.status(500).send(JSON.stringify(error.code));
        } else {
          res.status(200).send(results);
        }
      }
    );
  });
});
module.exports = router;
