const Role = require("../models/role");

const registerRole = async (req,res) => {
    if (!req.body.name || !req.body.name) {
        return res.status(401).send("Process failed: Imcoplete data");
    }
    const role = new Role({
        name:req.body.name,
        description: req.body.description,
        dbStatus:true,
    });
    const result = await role.save();
    if (!result) return res.status(401).send("Failed to register role")
    return res.status(200).send({role});
};

const listRole = async (req,res) => {
    const role = await Role.find();
    if(!role) return res.status(401).send("No Role");
    return res.status(200).send({role});
};

module.exports = { registerRole , listRole };