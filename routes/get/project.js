/**
 * Get project using parameters
 * Param : idproject, projectname
 * ParamType : int, string
 * RequestType : Get
 * RequestOn : Query
 * NOTE : If no paramter is not send all projects will be returned
 */

import { pool } from "../../config";
import { Router } from "express";
const router = Router();
import { Logger as logger } from "../../logger";

router.get("/", (req, res) => {
  var idproject = req.query.idproject;
  var projectname = req.query.projectname;
  pool.getConnection(function(err, connection) {
    if (err) {
      logger.error("CONNECTION POOL ERROR : /api/get/project : " + err);
      res.status(500).send(JSON.stringify({ error: "DB_CONNECTION_ERROR" }));
      return;
    }
    connection.query(
      "select * from `project` where `idproject`=COALESCE(?,`idproject`) and `projectname`=COALESCE(?,`projectname`)",
      [idproject, projectname],
      function(error, results, fields) {
        connection.release();
        if (error) {
          logger.error("/api/get/project : " + error);
          res.status(500).send(JSON.stringify(error.code));
        } else {
          res.status(200).send(results);
        }
      }
    );
  });
});
export default router;
