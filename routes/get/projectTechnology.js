/**
 * Get projectTechnology using parameters
 * Param : idprojectechnology, projectid, technologyid
 * ParamType : int, int, int
 * RequestType : Get
 * RequestOn : Query
 * NOTE : If no paramter is not send all projectTechnologies will be returned
 */

const pool = require("../../config").pool;
const express = require("express");
const router = express.Router();
var logger = require("../../logger").Logger;

router.get("/", (req, res) => {
  var idprojectechnology = req.query.idprojectechnology;
  var projectid = req.query.projectid;
  var technologyid = req.query.technologyid;

  pool.getConnection(function(err, connection) {
    if (err) {
      logger.error(
        "CONNECTION POOL ERROR : /api/get/projectTechnology : " + err
      );
      res.status(500).send(JSON.stringify({ error: "DB_CONNECTION_ERROR" }));
      return;
    }
    connection.query(
      "select * from `projecttechnology` where `idprojectechnology`=COALESCE(?,`idprojectechnology`) and \
      `projectid`=COALESCE(?,`projectid`) and \
      `technologyid`=COALESCE(?,`technologyid`)",
      [idprojectechnology, projectid, technologyid],
      function(error, results, fields) {
        connection.release();
        if (error) {
          logger.error("/api/get/projectTechnology : " + error);
          res.status(500).send(JSON.stringify(error.code));
        } else {
          res.status(200).send(results);
        }
      }
    );
  });
});
module.exports = router;
