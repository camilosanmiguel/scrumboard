const User = require("../models/user");
const Role = require("../models/role");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const registerUser = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).send("Process failed: Imcoplete data");
  }
  let existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    return res
      .status(400)
      .send("Process failed: The email user is already registered");
  }
  let hash = await bcrypt.hash(req.body.password, 10);
  let role = await Role.findOne({ name: "user" });
  if (!role)
    return res.status(400).send("Process failed: No role was assigned");

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    roleId: role._id,
    dbStatus: true,
  });
  const result = await user.save();
  if (!result) return res.status(400).send("Failed to register User");
  try {
    let jwt = user.generateJWT();
    return res.status(200).send({ jwt });
  } catch (error) {
    return res.status(400).send("Failed to register User");
  }
};

const listUser = async (req, res) => {
  const user = await User.find({ name: new RegExp(req.params["name"], "i") })
    .populate("RoleId")
    .exec();
  if (!user || user.length === 0) return res.status(401).send("No User");
  return res.status(200).send({ user });
};

const registerAdmin = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.roleId
  ) {
    return res.status(400).send("Process failed: Imcoplete data");
  }
  const validId = mongoose.Types.ObjectId.isValid(req.body.roleId);
  if (!validId) return res.status(400).send("Process failed: Invalid id");

  let existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res
      .status(400)
      .send("Process failed: The email user is already registered");
  }

  let hash = await bcrypt.hash(req.body.password, 10);

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    roleId: req.body.roleId,
    dbStatus: true,
  });
  const result = await user.save();
  if (!result) return res.status(400).send("Failed to register User");
  try {
    let jwt = user.generateJWT();
    return res.status(200).send({ jwt });
  } catch (error) {
    return res.status(400).send("Failed to register User");
  }
};

const updateUser = async (req, res) => {
  if (
    !req.body._id ||
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.roleId
  ) {
    return res.status(400).send("Process failed: Imcoplete data");
  }
  let pass = "";

  if (req.body.password) {
    pass = await bcrypt.hash(req.body.password, 10);
  } else {
    let userFind = await User.findOne({ email: req.body.email });
    pass = userFind.password;
  }

  let user = await User.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
    password: pass,
    roleId: req.body.roleId,
  });

  if (!user) return res.status(400).send("Process failes: Error editin user");
  return res.status(200).send({ user });
};
const deleteUser = async (req, res) => {
  if (!req.body._id) {
    return res.status(400).send("Process failed: Imcoplete data");
  }

  const user = await User.findByIdAndUpdate(req.body._id, {
    dbStatus: false,
  });
  if (!user) return res.status(400).send("Process failes: Error delete user");
  return res.status(200).send({ user });
};

module.exports = {
  registerUser,
  listUser,
  registerAdmin,
  updateUser,
  deleteUser,
};
