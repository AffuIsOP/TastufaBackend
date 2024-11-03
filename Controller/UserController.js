const { UsersCollection } = require("../Model/Users");

// METHOD -- GET
// API    -- http://localhost:3000/userreg

async function getUsers(req, res) {
  const allUsers = await UsersCollection.find();
  res.status(200).send(allUsers);
}

// METHOD -- POST
// API    -- http://localhost:3000/userreg

async function postUsers(req, res) {
  const { username, useremail, userpass, userroles } = req.body;

  const findIfExists = await UsersCollection.find({
    UserEmail: useremail.toLowerCase(),
  });

  if (findIfExists.length > 0)
    return res.status(409).send({ error: "this email already exists" });

//   await UsersCollection.create({
//     UserName: username.toLowerCase(),
//     UserEmail: useremail.toLowerCase(),
//     UserPass: userpass.toLowerCase(),
//     UserRoles: userroles.toLowerCase(),
//   });

  return res.status(201).send({ data: req.body });
}


module.exports = { getUsers, postUsers };