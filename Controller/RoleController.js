const { RolesCollection } = require("../Model/Roles");

// METHOD -- GET
// API    -- http://localhost:3000/roles

async function getRoles(req, res) {
  const allRoles = await RolesCollection.find();
  res.status(200).send(allRoles);
}

// METHOD -- POST
// API    -- http://localhost:3000/roles

async function postRoles(req, res) {
  const { rolename, rolestatus } = req.body;

  const roleNameRegex = /^[A-Za-z]+$/;

  if (!roleNameRegex.test(rolename)) {
    return res
      .status(400)
      .send({ error: "role name must contain only alphabets" });
  }

  const findIfExists = await RolesCollection.find({
    RoleName: rolename.toLowerCase(),
  });

  if (findIfExists.length > 0)
    return res.status(409).send({ error: "role name already exists" });

  await RolesCollection.create({
    RoleName: rolename.toLowerCase(),
    RoleStatus: rolestatus,
  });

  return res.status(201).send({ data: req.body });
}

// METHOD -- DELETE
// API    -- http://localhost:3000/roles/rolename

async function deleteRoles(req, res) {
  const urlRolename = req.params.rolename;

  await RolesCollection.deleteOne({
    RoleName: urlRolename,
  });

  return res.status(200).send({ message: "role name deleted successfully" });
}

// METHOD -- UPDATE
// API    -- http://localhost:3000/roles/rolename

async function updateRoles(req, res) {
  const urlRolename = req.params.rolename;
  
  const getOldRoleName = await RolesCollection.findOne({
    RoleName: urlRolename,
  });

  console.log(getOldRoleName)
  if (getOldRoleName) {

    const { RoleName, RoleStatus } = req.body;

    const roleNameRegex = /^[A-Za-z]+$/;

    if (!roleNameRegex.test(RoleName)) {
      return res
        .status(400)
        .send({ error: "role name must contain only alphabets" });
    }
    // const safeRoleName = rolename ? rolename.toLowerCase() : 'defaultRoleName2';

    const UpdatedRole = await RolesCollection.updateOne(
      {
        RoleName: urlRolename
      },
      {
        $set: {
          RoleName: RoleName,
          RoleStatus: RoleStatus,
        }
      }
    )

    console.log(UpdatedRole)

    return res.status(200).send({ message: "role updated successfully", data: req.body });
  } else {
    return res.status(400).send({"error": "role name not found" });
  }

}

module.exports = { getRoles, postRoles, deleteRoles, updateRoles };
