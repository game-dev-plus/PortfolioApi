# Portfolio Api

## Purpose

Api code for [portfolio project](https://github.com/game-dev-plus/PortfolioReact)

## Installing

- Clone [this](/#) git library.
- Install [nodejs](https://nodejs.org)
- Open project folder in command line
  `$ cd /path/to/project`
- Run [npm](https://www.npmjs.com) to install all dependencies

  `$ [sudo] npm install`

- Run application by :

  **1.** Using [nodemon](https://www.npmjs.com/package/nodemon)

  `$ [sudo] npm install -g nodemon`

  `$ nodemon`

  **2.** Using [forever](https://www.npmjs.com/package/forever)

  `$ [sudo] npm install -g forever`

  `$ forever start app.js`

---

# For Developers

## **Table of Content**

- [Dependencies](#Dependencies)
- [Dev Dependencies](#DevDependencies)
- [Config](#Config.js)
- [Status Codes](#Status-Codes)
- [App.js](#App.js)
- [Post Routes](#Post-Routes)
- [Get Routes](#Get-Routes)
- [Update Routes](#Update-Routes)
- [Delete Routes](#Delete-Routes)

**Dependencies**

See [Package.json](package.json) file for dependencies

- [Body-Parser](https://www.npmjs.com/package/body-parser)
- [Cookie-Parser](https://www.npmjs.com/package/cookie-parser)
- [Cors](https://www.npmjs.com/package/cors)
- [Express](https://www.npmjs.com/package/express)
- [Express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
- [Helmet](https://helmetjs.github.io/)
- [Morgan](https://www.npmjs.com/package/morgan)
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [Morgan](https://www.npmjs.com/package/morgan)
- [Mysql](https://www.npmjs.com/package/mysql)
- [Npm-Check-Updates](https://www.npmjs.com/package/npm-check-updates)

#### **Config.js**

Config.js file contains configuration for accessing database with this application.

#### **Status Codes**

    200 - Ok
    500 - Internal Server Error
    404 - File not found
    401 - Unauthorized
    403 - Forbidden
    ER_ROW_IS_REFERENCED_2 - Row is being used in other table
    ER_NO_REFERENCED_ROW_2 - Foreign key does not exist

## App.js

    - dbConfig contains the details of the server which contains the database
    - limiter used to limit the number of requests from a single user
    - server runs on port 4011

#### Post Routes

**Sample Response :**

```js
{
    "affectedRows": 1
}
```

[**/post/contact**](/routes/post/contact.js)

    Method type : [Post]

    [body]
        contactfullname : [string],
        contactemailaddress : [string],
        contactmessage : [string]

[**/post/project**](/routes/post/project.js)

    Method type : [Post]

    [body]
        projectname : [string],
        projectlink : [string],
        projectimage1 : [string],
        projectimage2 : [string],
        projectimage3 : [string]

[**/post/projecttechnology**](/routes/post/projecttechnology.js)

    Method type : [Post]

    [body]
        projectid : [int],
        technologyid : [int]

[**/post/technology**](/routes/post/technology.js)

    Method type : [Post]

    [body]
        technologyname : [string],
        technologycategoryid : [int]

[**/post/technologycategory**](/routes/post/technologycategory.js)

    Method type : [Post]

    [body]
        technologycategoryname : [string]

#### Update Routes

**Sample Response :**

```js
{
    "affectedRows": 1
}
```

[**/update/contact**](/routes/update/contact.js)

    Method type : [Put]

    [body]
        idcontact : [int],
        contactfullname : [string],
        contactemailaddress : [string],
        contactmessage : [string]

[**/update/project**](/routes/update/project.js)

    Method type : [Put]

    [body]
        idproject : [int],
        projectname : [string],
        projectlink : [string],
        projectimage1 : [string],
        projectimage2 : [string],
        projectimage3 : [string]

[**/update/projecttechnology**](/routes/update/projecttechnology.js)

    Method type : [Put]

    [body]
        idprojectechnology : [int],
        projectid : [int],
        technologyid : [int]

[**/update/technology**](/routes/update/technology.js)

    Method type : [Put]

    [body]
        idtechnology : [int],
        technologyname : [string],
        technologycategoryid : [int]

[**/update/technologycategory**](/routes/update/technologycategory.js)

    Method type : [Put]

    [body]
        idtechnologycategory : [int],
        technologycategoryname : [string]

#### Get Routes

```
If no parameter is sent all data will be received.
```

[**/get/contact**](/routes/get/contact.js)

    Method type : [Get]

    [query]
        idcontact : [int]

[**/get/project**](/routes/get/project.js)

    Method type : [Get]

    [query]
        idproject : [int],
        projectname : [string]

[**/get/projecttechnology**](/routes/get/projecttechnology.js)

    Method type : [Get]

    [query]
        idprojectechnology : [int],
        projectid : [int],
        technologyid : [int]

[**/get/technology**](/routes/get/technology.js)

    Method type : [Get]

    [query]
        idtechnology : [int],
        technologyname : [string],
        technologycategoryid : [int]

[**/get/technologycategory**](/routes/get/technologycategory.js)

    Method type : [Get]

    [query]
        idtechnologycategory : [int],
        technologycategoryname : [string]

#### Delete Routes

```
Delete data by supplied id
```

[**/delete/contact**](/routes/delete/contact.js)

    Method type : [Delete]

    [query]
        idcontact : [int]

[**/delete/project**](/routes/delete/project.js)

    Method type : [Delete]

    [query]
        idproject : [int]

[**/delete/projecttechnology**](/routes/delete/projecttechnology.js)

    Method type : [Delete]

    [query]
        idprojectechnology : [int]

[**/delete/technology**](/routes/delete/technology.js)

    Method type : [Delete]

    [query]
        idtechnology : [int]

[**/delete/technologycategory**](/routes/delete/technologycategory.js)

    Method type : [Delete]

    [query]
        idtechnologycategory : [int]
