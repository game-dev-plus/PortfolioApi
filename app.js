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
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,UPDATE,DELETE"
  );
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

//#region delete

const deleteContact = require("./routes/delete/contact");
app.use("/api/delete/contact", deleteContact);

const deleteProject = require("./routes/delete/project");
app.use("/api/delete/project", deleteProject);

const deleteProjectTechnology = require("./routes/delete/projectTechnology");
app.use("/api/delete/projectTechnology", deleteProjectTechnology);

const deleteTechnology = require("./routes/delete/technology");
app.use("/api/delete/technology", deleteTechnology);

const deleteTechnologyCategory = require("./routes/delete/technologycategory");
app.use("/api/delete/technologycategory", deleteTechnologyCategory);
//#endregion

//#region get

const getContact = require("./routes/get/contact");
app.use("/api/get/contact", getContact);

const getProject = require("./routes/get/project");
app.use("/api/get/project", getProject);

const getProjectTechnology = require("./routes/get/projectTechnology");
app.use("/api/get/projectTechnology", getProjectTechnology);

const getTechnology = require("./routes/get/technology");
app.use("/api/get/technology", getTechnology);

const getTechnologyCategory = require("./routes/get/technologycategory");
app.use("/api/get/technologycategory", getTechnologyCategory);
//#endregion

//#region post

const postContact = require("./routes/post/contact");
app.use("/api/post/contact", postContact);

const postProject = require("./routes/post/project");
app.use("/api/post/project", postProject);

const postProjectTechnology = require("./routes/post/projectTechnology");
app.use("/api/post/projectTechnology", postProjectTechnology);

const postTechnology = require("./routes/post/technology");
app.use("/api/post/technology", postTechnology);

const postTechnologyCategory = require("./routes/post/technologycategory");
app.use("/api/post/technologycategory", postTechnologyCategory);
//#endregion

//#region update

const updateContact = require("./routes/update/contact");
app.use("/api/update/contact", updateContact);

const updateProject = require("./routes/update/project");
app.use("/api/update/project", updateProject);

const updateProjectTechnology = require("./routes/update/projectTechnology");
app.use("/api/update/projectTechnology", updateProjectTechnology);

const updateTechnology = require("./routes/update/technology");
app.use("/api/update/technology", updateTechnology);

const updateTechnologyCategory = require("./routes/update/technologycategory");
app.use("/api/update/technologycategory", updateTechnologyCategory);
//#endregion
