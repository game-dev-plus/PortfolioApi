/**
 * Post technologycategory
 * Param : technologycategoryname
 * ParamType : string
 * RequestType : POST
 * RequestOn : Body
 */

import { pool } from "../../config";
import { Router } from "express";
const router = Router();
import { Logger as logger } from "../../logger";

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
export default router;
