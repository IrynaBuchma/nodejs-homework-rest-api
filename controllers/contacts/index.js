const { getAllContacts } = require("./getAllContacts");
const { getContactById } = require("./getContactById");
const { addContact } = require("./addContact");
const { removeContact } = require("./removeContact");
const { updateContact } = require("./updateContact");
const { updateFavoriteContact } = require("./updateFavoriteContact");


const { ctrlWrapper } = require("../../helpers");

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    removeContact: ctrlWrapper(removeContact),
    updateContact: ctrlWrapper(updateContact),
    updateFavoriteContact: ctrlWrapper(updateFavoriteContact),
  }