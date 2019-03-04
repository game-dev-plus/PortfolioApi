/**
 * Post contact to database
 * Param : contactfullname, contactemailaddress, contactmessage
 * ParamType : string, string, string
 * RequestType : POST
 * RequestOn : Body
 */

const pool = require("../../config").pool;
const express = require("express");
const router = express.Router();
var logger = require("../../logger").Logger;

router.post("/", (req, res) => {
  var contactfullname = req.body.contactfullname;
  var contactemailaddress = req.body.contactemailaddress;
  var contactmessage = req.body.contactmessage;
  pool.getConnection(function(err, connection) {
    if (err) {
      logger.error("CONNECTION POOL ERROR : /api/post/contact : " + err);
      res.status(500).send(JSON.stringify({ error: "DB_CONNECTION_ERROR" }));
      return;
    }
    connection.query(
      "INSERT INTO `contact` (`contactfullname`,`contactemailaddress`,`contactmessage`) VALUES (?,?,?)",
      [([contactfullname], [contactemailaddress], [contactmessage])],
      function(error, results, fields) {
        connection.release();
        if (error) {
          logger.error("/api/post/contact : " + error);
          res.status(500).send(JSON.stringify(error.code));
        } else {
          res.status(200).send(results);
        }
      }
    );
  });
});
module.exports = router;
