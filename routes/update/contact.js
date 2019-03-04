/**
 * Update contact using idcontact
 * Param : idcontact, contactfullname, contactemailaddress, contactmessage
 * ParamType : int, string, string, string
 * RequestType : PUT
 * RequestOn : Body
 */

import { pool } from "../../config";
import { Router } from "express";
const router = Router();
import { Logger as logger } from "../../logger";

router.put("/", (req, res) => {
  var idcontact = req.body.idcontact;
  var contactfullname = req.body.contactfullname;
  var contactemailaddress = req.body.contactemailaddress;
  var contactmessage = req.body.contactmessage;
  pool.getConnection(function(err, connection) {
    if (err) {
      logger.error("CONNECTION POOL ERROR : /api/update/contact : " + err);
      res.status(500).send(JSON.stringify({ error: "DB_CONNECTION_ERROR" }));
      return;
    }
    connection.query(
      "UPDATE `contact` SET `contactfullname`=?,`contactemailaddress`=?,`contactmessage`=? WHERE `idcontact`=?",
      [
        ([contactfullname],
        [contactemailaddress],
        [contactmessage],
        [idcontact])
      ],
      function(error, results, fields) {
        connection.release();
        if (error) {
          logger.error("/api/update/contact : " + error);
          res.status(500).send(JSON.stringify(error.code));
        } else {
          res.status(200).send(results);
        }
      }
    );
  });
});
export default router;
