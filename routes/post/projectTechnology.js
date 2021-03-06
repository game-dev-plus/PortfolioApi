/**
 * Post projecttechnology to database
 * Param : projectid, technologyid
 * ParamType : int, int
 * RequestType : POST
 * RequestOn : Body
 */

const pool = require("../../config").pool;
const express = require("express");
const router = express.Router();
var logger = require("../../logger").Logger;

router.post("/", (req, res) => {
  var projectid = req.body.projectid;
  var technologyid = req.body.technologyid;
  pool.getConnection(function(err, connection) {
    if (err) {
      logger.error(
        "CONNECTION POOL ERROR : /api/post/projecttechnology : " + err
      );
      res.status(500).send(JSON.stringify({ error: "DB_CONNECTION_ERROR" }));
      return;
    }
    connection.query(
      "INSERT INTO `projecttechnology` (`technologyid`, `projectid` ) VALUES (?,?)",
      [([technologyid], [projectid])],
      function(error, results, fields) {
        connection.release();
        if (error) {
          logger.error("/api/post/projecttechnology : " + error);
          res.status(500).send(JSON.stringify(error.code));
        } else {
          res.status(200).send(results);
        }
      }
    );
  });
});
module.exports = router;
