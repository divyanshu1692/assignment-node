// controllers/userController.js
const multer = require('multer');
const xlsx = require('xlsx');
const Contact = require('../models/Contact.js');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const handleExcelUpload = async (req, res) => {
    const workbook = xlsx.read(req.file.buffer);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    const users = data.map(item => ({
        name: item.name,
        email: item.email,
        phone: item.phone,
        address: item.address,
        image: item.image || '',
    }));

    try {
        const createdUsers = await Contact.insertMany(users);
        return res.status(200).json(createdUsers);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { upload, handleExcelUpload };