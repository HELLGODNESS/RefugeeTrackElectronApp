const { User } = require('../models');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async createUser(req, res) {
        try {
            const { name, email } = req.body;
            const user = await User.create({ name, email });
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    // Add other controller methods as needed
};
