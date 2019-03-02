/**
 * Update contact using idcontact
 * Param : idcontact, contactfullname, contactemailaddress, contactmessage
 * ParamType : int, string, string, string
 * RequestType : UPDATE
 * RequestOn : Body
 */

const pool = require("../../config").pool;
const express = require("express");
const router = express.Router();
var logger = require("../../logger").Logger;

router.update("/", (req, res) => {
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
