const { client } = require("../utils/prisma-client");


module.exports = {
    async getAllPersons(req, res) {
        try {
            const persons = await client.person.findMany();
            res.json(persons);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async createPerson(req, res) {
        try {
            const person = await client.person.create({ data: req.body })
            res.status(201).json(person);
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error.message });
        }
    }
    // Add other controller methods as needed
};
