const fs = require('fs/promises');
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
    return JSON.parse(result);
}

const getContactById = async (contactId) => {
  const id = String(contactId);
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === id);
    return result || null;
}

const removeContact = async (contactId) => {
  const id = String(contactId);
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(item => item.id === id);
  if (contactIndex === -1) {
      return null;
  }
  const [result] = contacts.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

const addContact = async (body) => {
  const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...body,
     }
     contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

const updateContact = async (contactId, body) => {
  const id = String(contactId);
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(item => item.id === id);
    if (contactIndex === -1) {
        return null;
    }
    contacts[contactIndex] = { contactId, ...body};
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[contactIndex];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
