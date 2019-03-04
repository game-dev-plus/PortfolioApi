/**
 * Delete a specific project using idproject parameter
 * Param : idproject
 * ParamType : int
 * RequestType : Delete
 * RequestOn : Query
 */

import { pool } from "../../config";
import { Router } from "express";
const router = Router();
import { Logger as logger } from "../../logger";

router.delete("/", (req, res) => {
  var idproject = req.query.idproject;
  pool.getConnection(function(err, connection) {
    if (err) {
      logger.error("CONNECTION POOL ERROR : /api/delete/project : " + err);
      res.status(500).send(JSON.stringify({ error: "DB_CONNECTION_ERROR" }));
      return;
    }
    connection.query(
      "delete from `project` where `idproject`=?",
      [idproject],
      function(error, results, fields) {
        connection.release();
        if (error) {
          logger.error("/api/delete/project : " + error);
          res.status(500).send(JSON.stringify(error.code));
        } else {
          res.status(200).send(results);
        }
      }
    );
  });
});
export default router;
