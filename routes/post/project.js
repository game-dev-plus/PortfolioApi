/**
 * Post project to database
 * Param : projectname, projectlink, projectimage1, projectimage2, projectimage3
 * ParamType : string, string, string, string, string
 * RequestType : POST
 * RequestOn : Body
 */

const pool = require("../../config").pool;
const express = require("express");
const router = express.Router();
var logger = require("../../logger").Logger;

router.post("/", (req, res) => {
  var projectname = req.body.projectname;
  var projectlink = req.body.projectlink;
  var projectimage1 = req.body.projectimage1;
  var projectimage2 = req.body.projectimage2;
  var projectimage3 = req.body.projectimage3;
  pool.getConnection(function(err, connection) {
    if (err) {
      logger.error("CONNECTION POOL ERROR : /api/post/project : " + err);
      res.status(500).send(JSON.stringify({ error: "DB_CONNECTION_ERROR" }));
      return;
    }
    connection.query(
      "INSERT INTO `project` (`projectname`, `projectlink`, `projectimage1`, `projectimage2`, `projectimage3`) VALUES (?,?,?,?,?)",
      [
        ([projectname],
        [projectlink],
        [projectimage1],
        [projectimage2],
        [projectimage3])
      ],
      function(error, results, fields) {
        connection.release();
        if (error) {
          logger.error("/api/post/project : " + error);
          res.status(500).send(JSON.stringify(error.code));
        } else {
          res.status(200).send(results);
        }
      }
    );
  });
});
module.exports = router;
