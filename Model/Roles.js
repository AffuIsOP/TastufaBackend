const mongoose = require("mongoose");

const roleSchema = mongoose.Schema(

    {
        RoleName:{
            type: String,
            required:[true, "Role Name is required"]
        },
        RoleStatus:{
            type: String,
            required:[true, "Role Status is required"]
        }
    }

)

const RolesCollection = mongoose.model("Roles", roleSchema)

module.exports = {RolesCollection};
