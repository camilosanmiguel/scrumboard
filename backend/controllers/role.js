const Role = require("../models/role");

const registerRole = async (req, res) => {
  if (!req.body.name || !req.body.description) {
    return res.status(400).send("Process failed: Imcoplete data");
  }
  const role = new Role({
    name: req.body.name,
    description: req.body.description,
    dbStatus: true,
  });
  const result = await role.save();
  if (!result) return res.status(400).send("Failed to register role");
  return res.status(200).send({ role });
};

const listRole = async (req, res) => {
  const role = await Role.find();
  if (!role || role.length === 0) return res.status(401).send("No Role");
  return res.status(200).send({ role });
};

const updateRole = async (req, res) => {
  if (
    !req.body._id ||
    !req.body.name ||
    !req.body.description
  ) {
    return res.status(400).send("Process failed: Imcoplete data");
  }

  let role = await Role.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    description: req.body.description
  });

  if (!role) return res.status(400).send("Process failes: Error editin role");
  return res.status(200).send({ role });
};

const deleteRole = async (req, res) => {
  if (!req.body._id) {
    return res.status(400).send("Process failed: Imcoplete data");
  }

  const role = await Role.findByIdAndUpdate(req.body._id, {
    dbStatus: false,
  });
  if (!role) return res.status(400).send("Process failes: Error delete role");
  return res.status(200).send({ role });
};

module.exports = { registerRole , listRole , updateRole , deleteRole };
