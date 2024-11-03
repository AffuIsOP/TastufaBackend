const {dbConn} = require("./Configuration/database") // Database Connection
const {
    getRoles,
    postRoles,
    deleteRoles,
    updateRoles
} = require("./Controller/RoleController") //Role Controller

const express = require("express");
const app = express();

require("dotenv").config();

app.use(express.json())
app.use(express.urlencoded({extended:true}))


// METHOD -- CREATE, READ
// API    -- http://localhost:3000/roles

app.route("/roles").get(getRoles).post(postRoles)

// METHOD -- DELETE, UPDATE/PUT
// API    -- http://localhost:3000/roles/rolename

app.route("/roles/:rolename").delete(deleteRoles).put(updateRoles)


app.listen(process.env.PORT, function(){
    console.log(`Server is running at: http://localhost:${process.env.PORT}/`);
    dbConn();
})