/**
 * Delete a specific contact using idcontact parameter
 * Param : idcontact
 * ParamType : int
 * RequestType : Delete
 * RequestOn : Query
 */

import { pool } from "../../config";
import { Router } from "express";
const router = Router();
import { Logger as logger } from "../../logger";

router.delete("/", (req, res) => {
  var idcontact = req.query.idcontact;
  pool.getConnection(function(err, connection) {
    if (err) {
      logger.error("CONNECTION POOL ERROR : /api/delete/contact : " + err);
      res.status(500).send(JSON.stringify({ error: "DB_CONNECTION_ERROR" }));
      return;
    }
    connection.query(
      "delete from `contact` where `idcontact`=?",
      [idcontact],
      function(error, results, fields) {
        connection.release();
        if (error) {
          logger.error("/api/delete/contact : " + error);
          res.status(500).send(JSON.stringify(error.code));
        } else {
          res.status(200).send(results);
        }
      }
    );
  });
});
export default router;
