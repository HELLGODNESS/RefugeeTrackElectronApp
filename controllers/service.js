const { client } = require("../utils/prisma-client");
const path = require('path')


module.exports = {
    async getAllServices(req, res) {
        try {
            const { page = 0, limit = 20, search, date, service } = req.query;
            const where = {
                date: date,
                service: service,
                ...(search && {
                    person: {
                        OR: [
                            { firstName: { contains: search } },
                            { lastName: { contains: search } },
                            { emailAddress: { contains: search } },
                            { cell: { contains: search } },
                        ],
                    }
                })
            }
            const services = await client.service.findMany({
                where,
                skip: +page < 1 ? 0 : +page * limit,
                take: +limit,
                include: {
                    person: true
                }
            });
            const count = await client.service.count({ where });

            res.json({ list: services.map(x => ({ ...x, ...x.person })), count });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error.message });
        }
    },
    async giveService(req, res) {
        try {
            const { personId, service, date } = req.body
            const serviceCreated = await client.service.create({
                data: {
                    personId: +personId,
                    service,
                    date
                }
            })
            res.status(201).json(serviceCreated);
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error.message });
        }
    }
    // Add other controller methods as needed
};
