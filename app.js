const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const RateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");

//rate limiter middleware
var limiter = new RateLimit({
  windowMs: 10000, // 10 sec
  max: 100, // limit each IP to 100 requests per windowMs
  delayMs: 0 // disable delaying - full speed until the max limit is reached
});

const app = express();
const server = http.createServer(app);
app.use(helmet());

const allowedHeaders =
  "Origin, X-Requested-With,Content-Type,Accept,headerauth";

app.use(limiter);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(morgan());
app.use(bodyParser());
app.use(express.json());
app.use(express.urlencoded());
app.options("*", cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", allowedHeaders);
  next();
});

// start server
server.listen(4011, () => {
  console.log("rest service running on port 4011");
});

// method to ensure the token is being sent and select company according to the token
function ensureToken(req, res, next) {
  const bearerHeader = req.headers["headerauth"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader;
    req.token = bearerToken;
    try {
      var decoded = jwt.decode(bearerToken);
      if (decoded.token.userip > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}
// middleware to route requests and check for jwt
app.use(function(req, res, next) {
  return next();

  if (req.url === "/api/get/token") {
    return next();
  }

  if (ensureToken(req, res, next)) {
    //verify token from ensuretoken method
    jwt.verify(req.token, process.env.SECRET_KEY, function(err, data) {
      if (err) {
        res.sendStatus(403);
        return;
      }
    });
    next();
  } else {
    res.sendStatus(403); //return forbideen status
    return;
  }
});
