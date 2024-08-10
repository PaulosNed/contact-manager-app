const expressAsyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// fetch all contacts in databse created by requesting user
const getAllContacts = expressAsyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json(contacts);
});

// fetch a single contact using id created by requesting user
const getContact = expressAsyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("You are not allowed to access this contact");
  }

  res.status(200).json(contact);
});

// Create a single contact
const CreateContact = expressAsyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const newContact = await Contact.create({ user_id: req.user._id, name, email, phone });

  res.status(201).json(newContact);
});

// Update a single contact
const updateContact = expressAsyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  
  if (contact.user_id.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("You are not allowed to Edit this contact");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});

// Delete a single contact
const deleteContact = expressAsyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("You are not allowed to Delete this contact");
  }
  
  await Contact.findByIdAndDelete(req.params.id);
  res.status(204).json(contact);
});

module.exports = {
  getAllContacts,
  getContact,
  CreateContact,
  updateContact,
  deleteContact,
};
