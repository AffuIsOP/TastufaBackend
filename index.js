const express = require("express");
const app = express();

require("dotenv").config();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const {dbConn} = require("./Configuration/database") // Database Connection

const {
    getRoles,
    postRoles,
    deleteRoles,
    updateRoles
} = require("./Controller/RoleController"); //Role Controller

const {
    getUsers,
    postUsers,
} = require("./Controller/UserController"); //User Controller

// METHOD -- POST/CREATE, GET/READ
// API    -- http://localhost:3000/roles

app.route("/roles").get(getRoles).post(postRoles);

// METHOD -- DELETE, UPDATE/PUT
// API    -- http://localhost:3000/roles/rolename

app.route("/roles/:rolename").delete(deleteRoles).put(updateRoles);

// METHOD -- POST/CREATE, GET/READ
// API    -- http://localhost:3000/userreg

app.route("/userreg").get(getUsers).post(postUsers)


app.listen(process.env.PORT, function(){
    console.log(`Server is running at: http://localhost:${process.env.PORT}/`);
    dbConn();
})