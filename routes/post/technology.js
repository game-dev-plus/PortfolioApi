/**
 * Post technology to database
 * Param : technologyname, technologycategoryid
 * ParamType : string, int
 * RequestType : POST
 * RequestOn : Body
 */

const pool = require("../../config").pool;
const express = require("express");
const router = express.Router();
var logger = require("../../logger").Logger;

router.post("/", (req, res) => {
  var technologyname = req.body.technologyname;
  var technologycategoryid = req.body.technologycategoryid;
  pool.getConnection(function(err, connection) {
    if (err) {
      logger.error("CONNECTION POOL ERROR : /api/post/technology : " + err);
      res.status(500).send(JSON.stringify({ error: "DB_CONNECTION_ERROR" }));
      return;
    }
    connection.query(
      "INSERT INTO `technology` (`technologyname`, `technologycategoryid`) VALUES (?,?)",
      [([technologyname], [technologycategoryid])],
      function(error, results, fields) {
        connection.release();
        if (error) {
          logger.error("/api/post/technology : " + error);
          res.status(500).send(JSON.stringify(error.code));
        } else {
          res.status(200).send(results);
        }
      }
    );
  });
});
module.exports = router;
