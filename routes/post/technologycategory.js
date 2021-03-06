/**
 * Post technologycategory
 * Param : technologycategoryname
 * ParamType : string
 * RequestType : POST
 * RequestOn : Body
 */

const pool = require("../../config").pool;
const express = require("express");
const router = express.Router();
var logger = require("../../logger").Logger;

router.post("/", (req, res) => {
  var technologycategoryname = req.body.technologycategoryname;
  pool.getConnection(function(err, connection) {
    if (err) {
      logger.error(
        "CONNECTION POOL ERROR : /api/post/technologycategory : " + err
      );
      res.status(500).send(JSON.stringify({ error: "DB_CONNECTION_ERROR" }));
      return;
    }
    connection.query(
      "INSERT INTO `technologycategory` (`technologycategoryname`) VALUES (?)",
      [[technologycategoryname]],
      function(error, results, fields) {
        connection.release();
        if (error) {
          logger.error("/api/post/technologycategory : " + error);
          res.status(500).send(JSON.stringify(error.code));
        } else {
          res.status(200).send(results);
        }
      }
    );
  });
});
module.exports = router;
