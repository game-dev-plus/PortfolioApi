/**
 * Update project using idproject
 * Param : idproject, projectname, projectlink, projectimage1, projectimage2, projectimage3
 * ParamType : int, string, string, string, string, string
 * RequestType : PUT
 * RequestOn : Body
 */

import { pool } from "../../config";
import { Router } from "express";
const router = Router();
import { Logger as logger } from "../../logger";

router.put("/", (req, res) => {
  var idproject = req.body.idproject;
  var projectname = req.body.projectname;
  var projectlink = req.body.projectlink;
  var projectimage1 = req.body.projectimage1;
  var projectimage2 = req.body.projectimage2;
  var projectimage3 = req.body.projectimage3;

  pool.getConnection(function(err, connection) {
    if (err) {
      logger.error("CONNECTION POOL ERROR : /api/update/project : " + err);
      res.status(500).send(JSON.stringify({ error: "DB_CONNECTION_ERROR" }));
      return;
    }
    connection.query(
      "UPDATE `project` SET `projectname`=?,`projectlink`=?,`projectimage1`=?,`projectimage2`=?,`projectimage3`=? WHERE `idcontact`=?",
      [
        ([projectname],
        [projectlink],
        [projectimage1],
        [projectimage2],
        [projectimage3],
        [idproject])
      ],
      function(error, results, fields) {
        connection.release();
        if (error) {
          logger.error("/api/update/project : " + error);
          res.status(500).send(JSON.stringify(error.code));
        } else {
          res.status(200).send(results);
        }
      }
    );
  });
});
export default router;
