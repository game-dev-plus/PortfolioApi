/**
 * Update technology using idtechnology
 * Param : idtechnology, technologyname, technologycategoryid
 * ParamType : int, string, int
 * RequestType : PUT
 * RequestOn : Body
 */

const pool = require("../../config").pool;
const express = require("express");
const router = express.Router();
var logger = require("../../logger").Logger;

router.put("/", (req, res) => {
  var idtechnology = req.body.idtechnology;
  var technologyname = req.body.technologyname;
  var technologycategoryid = req.body.technologycategoryid;

  pool.getConnection(function(err, connection) {
    if (err) {
      logger.error("CONNECTION POOL ERROR : /api/update/technology : " + err);
      res.status(500).send(JSON.stringify({ error: "DB_CONNECTION_ERROR" }));
      return;
    }
    connection.query(
      "UPDATE `technology` SET `technologyname`=?,`technologycategoryid`=? WHERE `idtechnology`=?",
      [([technologyname], [technologycategoryid], [idtechnology])],
      function(error, results, fields) {
        connection.release();
        if (error) {
          logger.error("/api/update/technology : " + error);
          res.status(500).send(JSON.stringify(error.code));
        } else {
          res.status(200).send(results);
        }
      }
    );
  });
});
module.exports = router;
