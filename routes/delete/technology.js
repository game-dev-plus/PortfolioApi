/**
 * Delete a specific technology using idtechnology parameter
 * Param : idtechnology
 * ParamType : int
 * RequestType : Delete
 * RequestOn : Query
 */

const pool = require("../../config").pool;
const express = require("express");
const router = express.Router();
var logger = require("../../logger").Logger;

router.delete("/", (req, res) => {
  var idtechnology = req.query.idtechnology;

  pool.getConnection(function(err, connection) {
    if (err) {
      logger.error("CONNECTION POOL ERROR : /api/delete/technology : " + err);
      res.status(500).send(JSON.stringify({ error: "DB_CONNECTION_ERROR" }));
      return;
    }
    connection.query(
      "delete from `technology` where `idtechnology`=?)",
      [idtechnology],
      function(error, results, fields) {
        connection.release();
        if (error) {
          logger.error("/api/delete/technology : " + error);
          res.status(500).send(JSON.stringify(error.code));
        } else {
          res.status(200).send(results);
        }
      }
    );
  });
});
module.exports = router;
