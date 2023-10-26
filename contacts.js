const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  } else {
    const newContact = [
      ...contacts.slice(0, index),
      ...contacts.slice(index + 1),
    ];
    await fs.writeFile(contactsPath, JSON.stringify(newContact, null, 2));
    return contacts[index];
  }
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    //...contacts,
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
