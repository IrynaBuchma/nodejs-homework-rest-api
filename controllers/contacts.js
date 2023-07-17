const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
    const list = await Contact.find({}, "name email phone");
    res.json(list);
  }

const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findOne({_id: contactId}, "name email phone");
          if(!result) {
            throw HttpError(404, 'Not found');
          }
        res.json(result);
}

const addContact = async(req, res) => {
    const result = await Contact.create(req.body);
        res.status(201).json(result);
        
}

const removeContact = async (req, res) => {
    const {contactId} = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
          if(!result) {
            throw HttpError(404, 'Not found');
          }
        res.json({ message: 'Contact deleted' });
}

const updateContact = async (req, res) => {
    const {contactId} = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
            if(!result) {
              throw HttpError(404, 'Not found');
          }
        res.json(result);
  }

  const updateFavorite = async (req, res) => {
    const {contactId} = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
            if(!result) {
              throw HttpError(404, 'Not found');
          }
        res.json(result);
  }

  module.exports = {
    listContacts: ctrlWrapper(listContacts),
    getById: ctrlWrapper(getById),
    addContact: ctrlWrapper(addContact),
    removeContact: ctrlWrapper(removeContact),
    updateContact: ctrlWrapper(updateContact),
    updateFavorite: ctrlWrapper(updateFavorite),
  }