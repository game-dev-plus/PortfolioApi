/**
 * Update projecttechnology using idprojectechnology
 * Param : idprojectechnology, projectid, technologyid
 * ParamType : int, int, int
 * RequestType : PUT
 * RequestOn : Body
 */

import { pool } from "../../config";
import { Router } from "express";
const router = Router();
import { Logger as logger } from "../../logger";

router.put("/", (req, res) => {
  var idprojectechnology = req.body.idprojectechnology;
  var projectid = req.body.projectid;
  var technologyid = req.body.technologyid;

  pool.getConnection(function(err, connection) {
    if (err) {
      logger.error(
        "CONNECTION POOL ERROR : /api/update/projecttechnology : " + err
      );
      res.status(500).send(JSON.stringify({ error: "DB_CONNECTION_ERROR" }));
      return;
    }
    connection.query(
      "UPDATE `projecttechnology` SET `projectid`=?,`technologyid`=? WHERE `idprojectechnology`=?",
      [([projectid], [technologyid], [idprojectechnology])],
      function(error, results, fields) {
        connection.release();
        if (error) {
          logger.error("/api/update/projecttechnology : " + error);
          res.status(500).send(JSON.stringify(error.code));
        } else {
          res.status(200).send(results);
        }
      }
    );
  });
});
export default router;
