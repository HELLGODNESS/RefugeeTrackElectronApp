const { format, startOfDay, endOfDay, eachDayOfInterval, subDays } = require("date-fns");
const { client } = require("../utils/prisma-client");
const path = require('path')


const getTimeSeries = (list, timeFrom, timeTo) => {
    const getInterval = eachDayOfInterval({
        start: new Date(timeFrom),
        end: new Date(timeTo),
    });

    if (getInterval && getInterval.length) {
        const getObjs = getInterval.map((intr) => {
            let count = 0;
            const intervalToString = format(new Date(intr), 'yyyy-MM-dd');
            list.forEach((obj) => {
                const created = format(new Date(obj.createdAt), 'yyyy-MM-dd');
                if (created === intervalToString) {
                    count++;
                }
            });
            return {
                time: intervalToString,
                count: count,
            };
        });
        return getObjs;
    }
};

module.exports = {
    async getStats(req, res) {
        try {
            const timeFrom = subDays(startOfDay(new Date()), 7);
            const timeTo = endOfDay(new Date());

            const services = await client.service.findMany({
                where: {
                    deletedAt: null,
                    createdAt: {
                        gte: timeFrom,
                        lte: timeTo
                    }
                },
                select: {
                    createdAt: true,
                    id: true,
                    service: true,
                    person: {
                        select: {
                            child: true
                        }
                    }
                }
            });

            const takeAways = []
            services.forEach(x => {
                if (x.service.toUpperCase() == "TAKEAWAY_PACKAGE") {
                    takeAways.push(x)
                    if (+x.person.child) {
                        Array.from({ length: +x.person.child }, (_, i) => {
                            takeAways.push(x)
                        })
                    }
                }
            })
            res.json({
                cafeteria: getTimeSeries(services.filter(x => x.service.toUpperCase() == "CAFETERIA"), timeFrom, timeTo),
                takeawayPackage: getTimeSeries(takeAways, timeFrom, timeTo),
                showers: getTimeSeries(services.filter(x => x.service.toUpperCase() == "SHOWERS"), timeFrom, timeTo),
                covers: getTimeSeries(services.filter(x => x.service.toUpperCase() == "COVERS"), timeFrom, timeTo),
                medicines: getTimeSeries(services.filter(x => x.service.toUpperCase() == "MEDICINES"), timeFrom, timeTo),
            });

        } catch (error) {
            console.log(error)
        }
    },
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
            const takeawayPackage = await client.service.findMany({
                where: {
                    date: date,
                    deletedAt: null,
                    service: "TAKEAWAY_PACKAGE"
                },
                select: {
                    service: true,
                    person: {
                        select: {
                            child: true
                        }
                    }
                }
            });

            let takeAways = 0
            takeawayPackage.forEach(x => {
                if (x.service.toUpperCase() == "TAKEAWAY_PACKAGE") {
                    takeAways += 1
                    if (+x.person.child) {
                        takeAways += +x.person.child
                    }
                }
            })

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
                takeawayPackage: takeAways,
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
