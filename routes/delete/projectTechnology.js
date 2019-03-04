/**
 * Delete a specific projectTechnology using idprojectechnology parameter
 * Param : idprojectechnology
 * ParamType : int
 * RequestType : Delete
 * RequestOn : Query
 */

const pool = require("../../config").pool;
const express = require("express");
const router = express.Router();
var logger = require("../../logger").Logger;

router.delete("/", (req, res) => {
  var idprojectechnology = req.query.idprojectechnology;

  pool.getConnection(function(err, connection) {
    if (err) {
      logger.error(
        "CONNECTION POOL ERROR : /api/delete/projectTechnology : " + err
      );
      res.status(500).send(JSON.stringify({ error: "DB_CONNECTION_ERROR" }));
      return;
    }
    connection.query(
      "delete from `projecttechnology` where `idprojectechnology`=?",
      [idprojectechnology],
      function(error, results, fields) {
        connection.release();
        if (error) {
          logger.error("/api/delete/projectTechnology : " + error);
          res.status(500).send(JSON.stringify(error.code));
        } else {
          res.status(200).send(results);
        }
      }
    );
  });
});
module.exports = router;
