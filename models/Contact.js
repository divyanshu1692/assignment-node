const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    image: { type: String },
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
