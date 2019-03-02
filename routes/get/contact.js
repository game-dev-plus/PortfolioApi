/**
 * Get contacts using parameter
 * Param : idcontact
 * ParamType : int
 * RequestType : Get
 * RequestOn : Query
 * NOTE : If no paramter is not send all contacts will be returned
 */

const pool = require("../../config").pool;
const express = require("express");
const router = express.Router();
var logger = require("../../logger").Logger;

router.get("/", (req, res) => {
  var idcontact = req.query.idcontact;
  pool.getConnection(function(err, connection) {
    if (err) {
      logger.error("CONNECTION POOL ERROR : /api/get/contact : " + err);
      res.status(500).send(JSON.stringify({ error: "DB_CONNECTION_ERROR" }));
      return;
    }
    connection.query(
      "select * from `contact` where `idcontact`=COALESCE(?,`idcontact`)",
      idcontact,
      function(error, results, fields) {
        connection.release();
        if (error) {
          logger.error("/api/get/contact : " + error);
          res.status(500).send(JSON.stringify(error.code));
        } else {
          res.status(200).send(results);
        }
      }
    );
  });
});
