const fs = require('fs');
const xlsx = require('xlsx');
const { GraphQLUpload } = require('apollo-server-express');

const { signupController, loginController } = require('../../controller/authController.js');
const User = require('../../models/User.js');
const Contact = require('../../models/Contact.js');
const { generateToken, verifyToken } = require('../../utils/jwt.js');

const resolvers = {
    Query: {
        // To fetch the authenticated user
        me: async (_, __, { user }) => {
            if (!user) throw new Error('Not authenticated');
            return user;
        },

        contacts: async () => {
            return await Contact.find();
        },

        getContact: async (_, { id }) => {
            try {
                const contact = await Contact.findById(id);
                if (!contact) {
                    throw new Error('Contact not found');
                }
                return contact;
            } catch (error) {
                throw new Error(error);
            }
        },
    },
    Mutation: {
        // Sign up user and return token
        signup: async (_, { username, email, password }) => {
            return await signupController(username, email, password);
        },
        // Login user and return token
        login: async (_, { email, password }) => {
            return await loginController(email, password);
        },

        addContacts: async (_, { contact }) => {
            const newContact = new Contact(contact);
            await newContact.save();
            return newContact;
        },
        bulkUpload: async (_, { contacts }) => {
            const createdContacts = await Contact.insertMany(contacts);
            return createdContacts;
        },

        updateContact: async (_, { contact }) => {
            try {
                const updatedContact = await Contact.findByIdAndUpdate(
                    contact.id,
                    contact,
                    { new: true, runValidators: true }
                );
                if (!updatedContact) {
                    throw new Error('Contact not found');
                }
                return updatedContact;
            } catch (error) {
                throw new Error(error);
            }
        },

        deleteContact: async (_, { id }) => {
            try {
                const deletedContact = await Contact.findByIdAndDelete(id);
                if (!deletedContact) {
                    throw new Error('Contact not found');
                }
                return deletedContact;
            } catch (error) {
                throw new Error(error);
            }
        },
    }
};

module.exports = resolvers;