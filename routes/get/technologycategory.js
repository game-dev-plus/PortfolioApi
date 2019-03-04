/**
 * Get technologyCategory using parameter
 * Param : idtechnologycategory, technologycategoryname
 * ParamType : int, string
 * RequestType : Get
 * RequestOn : Query
 * NOTE : If no paramter is not send all technologyCategory will be returned
 */

import { pool } from "../../config";
import { Router } from "express";
const router = Router();
import { Logger as logger } from "../../logger";

router.get("/", (req, res) => {
  var idtechnologycategory = req.query.idtechnologycategory;
  var technologycategoryname = req.query.technologycategoryname;

  pool.getConnection(function(err, connection) {
    if (err) {
      logger.error(
        "CONNECTION POOL ERROR : /api/get/technologycategory : " + err
      );
      res.status(500).send(JSON.stringify({ error: "DB_CONNECTION_ERROR" }));
      return;
    }
    connection.query(
      "select * from `technologycategory` where `idtechnologycategory`=COALESCE(?,`idtechnologycategory`) and \
      `technologycategoryname`=COALESCE(?,`technologycategoryname`)",
      [idtechnologycategory, technologycategoryname],
      function(error, results, fields) {
        connection.release();
        if (error) {
          logger.error("/api/get/technologycategory : " + error);
          res.status(500).send(JSON.stringify(error.code));
        } else {
          res.status(200).send(results);
        }
      }
    );
  });
});
export default router;
