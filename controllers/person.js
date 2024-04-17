const { client } = require("../utils/prisma-client");
const path = require('path')


module.exports = {
    async getAllPersons(req, res) {
        try {
            const { page = 0, limit = 20 } = req.params;
            const persons = await client.person.findMany({
                skip: +page < 1 ? 0 : +page * limit,
                take: limit,
            });
            const count = await client.person.count();

            res.json({ list: persons, count });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async createPerson(req, res) {
        try {
            const { body, files } = req
            const image = files && files.length && files[0].filename
            console.log(body, 'body')
            const person = await client.person.create({
                data: {
                    ...body,
                    ...(image && { image }),
                    ...(body.bornOn && {
                        bornOn: new Date(body.bornOn).toISOString()
                    })
                }
            })
            res.status(201).json(person);
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error.message });
        }
    }
    // Add other controller methods as needed
};