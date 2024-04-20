const { client } = require("../utils/prisma-client");
const path = require('path')


module.exports = {
    async getAllServices(req, res) {
        try {
            const { page = 0, limit = 20, search, date, service } = req.query;
            const where = {
                deletedAt: null,
                date: date,
                service: service.toUpperCase(),
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

            res.json({ list: services.map(x => ({ ...x.person, ...x })), count });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error.message });
        }
    },

    async getServicesCount(req, res) {
        try {

            const { date } = req.query;

            const cafeteria = await client.service.count({
                where: {
                    date: date,
                    deletedAt: null,
                    service: 'CAFETERIA'
                }
            });
            const takeawayPackage = await client.service.count({
                where: {
                    date: date,
                    deletedAt: null,
                    service: 'TAKEAWAY_PACKAGE'
                }
            });

            const showers = await client.service.count({
                where: {
                    date: date,
                    deletedAt: null,
                    service: 'SHOWERS'
                }
            })

            const covers = await client.service.count({
                where: {
                    date: date,
                    deletedAt: null,
                    service: 'COVERS'
                }
            })

            const medicines = await client.service.count({
                where: {
                    date: date,
                    deletedAt: null,
                    service: 'MEDICINES'
                }
            })

            res.json({
                cafeteria,
                takeawayPackage,
                showers,
                covers,
                medicines
            });
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
                    service: service.toUpperCase(),
                    date
                }
            })
            res.status(201).json(serviceCreated);
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error.message });
        }
    },

    async deleteService(req, res) {
        try {
            const { id } = req.query;
            const serviceDeleted = await client.service.update({
                where: {
                    id: +id
                },
                data: {
                    deletedAt: new Date()
                }
            })
            res.status(201).json(serviceDeleted);
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error.message });
        }
    }
};
