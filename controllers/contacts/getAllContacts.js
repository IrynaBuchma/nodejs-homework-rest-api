const { Contact } = require("../../models/contact");

const listContacts = async (req, res) => {
    const list = await Contact.find({}, "name email phone");
    res.json(list);
  }

module.exports = { 
  getAllContacts: listContacts
};