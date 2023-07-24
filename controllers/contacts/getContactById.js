const { Contact } = require("../../models/contact");

const { HttpError } = require("../../helpers");

const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findOne({_id: contactId}, "name email phone");
          if(!result) {
            throw HttpError(404, 'Not found');
          }
        res.json(result);
}

module.exports = { 
    getContactById: getById,
};