/**
 * Get technology using parameter
 * Param : idtechnology, technologyname, technologycategoryid
 * ParamType : int, string, int
 * RequestType : Get
 * RequestOn : Query
 * NOTE : If no paramter is not send all technology will be returned
 */

import { pool } from "../../config";
import { Router } from "express";
const router = Router();
import { Logger as logger } from "../../logger";

router.get("/", (req, res) => {
  var idtechnology = req.query.idtechnology;
  var technologyname = req.query.technologyname;
  var technologycategoryid = req.query.technologycategoryid;

  pool.getConnection(function(err, connection) {
    if (err) {
      logger.error("CONNECTION POOL ERROR : /api/get/technology : " + err);
      res.status(500).send(JSON.stringify({ error: "DB_CONNECTION_ERROR" }));
      return;
    }
    connection.query(
      "select * from `technology` where `idtechnology`=COALESCE(?,`idtechnology`) and \
      `technologyname`=COALESCE(?,`technologyname`) and \
      `technologycategoryid`=COALESCE(?,`technologycategoryid`)",
      [idtechnology, technologyname, technologycategoryid],
      function(error, results, fields) {
        connection.release();
        if (error) {
          logger.error("/api/get/technology : " + error);
          res.status(500).send(JSON.stringify(error.code));
        } else {
          res.status(200).send(results);
        }
      }
    );
  });
});
export default router;
