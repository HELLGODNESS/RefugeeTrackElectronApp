const { format, startOfDay, endOfDay, eachDayOfInterval, subDays } = require("date-fns");
const { client } = require("../utils/prisma-client");
const path = require('path')
const ExcelJS = require('exceljs')

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
            const { startDate, endDate } = req.query;

            const timeFrom = startDate ? new Date(startDate) : subDays(startOfDay(new Date()), 7);
            const timeTo = endDate ? new Date(endDate) : endOfDay(new Date());

            const services = await client.service.findMany({
                where: {
                    deletedAt: null,
                    createdAt: {
                        gte: timeFrom,
                        lte: timeTo
                    },
                    person: {
                        deletedAt: null
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
    async getBarchart(req, res) {
        try {
            const { startDate, endDate } = req.query;

            const timeFrom = startDate ? new Date(startDate) : subDays(startOfDay(new Date()), 7);
            const timeTo = endDate ? new Date(endDate) : endOfDay(new Date());

            const services = await client.service.findMany({
                where: {
                    deletedAt: null,
                    createdAt: {
                        gte: timeFrom,
                        lte: timeTo
                    },
                    person: {
                        deletedAt: null
                    }
                },
                select: {
                    createdAt: true,
                    id: true,
                    service: true,
                    person: {
                        select: {
                            child: true,
                            nationality: true,
                        }
                    }
                }
            });

            const nationalities = {}
            services.forEach(x => {

                if (nationalities[x.person?.nationality || 'N/A']) {
                    nationalities[x.person?.nationality || 'N/A'] += 1
                } else {
                    nationalities[x.person?.nationality || 'N/A'] = 1
                }
                if (x.service.toUpperCase() == "TAKEAWAY_PACKAGE") {
                    if (+x.person.child) {
                        nationalities[x.person?.nationality] += +x.person.child
                    }
                }
            })
            res.json({
                nationalities
            });

        } catch (error) {
            console.log(error)
        }
    },
    async getAllServices(req, res) {
        try {
            const { page = 0, limit = 20, search, date, service, id, child, name, startDate, endDate } = req.query;
            const filters = [{
                person: {
                    deletedAt: null
                }
            }]
            if (search) {
                filters.push({
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
            if (id) {
                filters.push({
                    person: {
                        id: +id
                    }
                })
            }
            if (child) {
                filters.push({
                    person: {
                        child: child
                    }
                })
            }

            if (name) {
                filters.push({
                    person: {
                        OR: [
                            { firstName: { contains: name } },
                            { lastName: { contains: name } },
                        ],
                    }
                })
            }
            const where = {
                deletedAt: null,
                ...(startDate && endDate && { createdAt: { gte: new Date(startDate).toISOString(), lte: new Date(endDate).toISOString() } }),
                ...(date && { date: date }),
                ...(service && { service: service.toUpperCase() }),
                ...(filters.length && {}),
                AND: filters
            }
            console.log(where, 'where')
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

            const { date, startDate, endDate } = req.query;
            const cafeteria = await client.service.count({
                where: {
                    ...(startDate && endDate && { createdAt: { gte: new Date(startDate).toISOString(), lte: new Date(endDate).toISOString() } }),
                    ...(date && { date: date }),
                    deletedAt: null,
                    service: 'CAFETERIA',
                    person: {
                        deletedAt: null
                    }
                }
            });
            const takeawayPackage = await client.service.findMany({
                where: {
                    ...(startDate && endDate && { createdAt: { gte: new Date(startDate).toISOString(), lte: new Date(endDate).toISOString() } }),
                    ...(date && { date: date }),
                    deletedAt: null,
                    service: "TAKEAWAY_PACKAGE",
                    person: {
                        deletedAt: null
                    }
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
                    ...(startDate && endDate && { createdAt: { gte: new Date(startDate).toISOString(), lte: new Date(endDate).toISOString() } }),
                    ...(date && { date: date }),
                    deletedAt: null,
                    service: 'SHOWERS',
                    person: {
                        deletedAt: null
                    }
                }
            })

            const covers = await client.service.count({
                where: {
                    ...(startDate && endDate && { createdAt: { gte: new Date(startDate).toISOString(), lte: new Date(endDate).toISOString() } }),
                    ...(date && { date: date }),
                    deletedAt: null,
                    service: 'COVERS',
                    person: {
                        deletedAt: null
                    }
                }
            })

            const medicines = await client.service.count({
                where: {
                    ...(startDate && endDate && { createdAt: { gte: new Date(startDate).toISOString(), lte: new Date(endDate).toISOString() } }),
                    ...(date && { date: date }),
                    deletedAt: null,
                    service: 'MEDICINES',
                    person: {
                        deletedAt: null
                    }
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
            if (service == "CAFETERIA" || service == "TAKEAWAY_PACKAGE") {
                const serviceExist = await client.service.findFirst({
                    where: {
                        personId: +personId,
                        service: { in: ["CAFETERIA", "TAKEAWAY_PACKAGE"] },
                        date
                    }
                })
                if (serviceExist) {
                    throw new Error('Service already given to this person')
                }
            }
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
    },


    async exportData(req, res) {
        try {
            const { page = 0, limit = 20, search, date, service, id, child, name, startDate, endDate } = req.query;
            const filters = [{
                person: {
                    deletedAt: null
                }
            }]
            if (search) {
                filters.push({
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
            if (id) {
                filters.push({
                    person: {
                        id: +id
                    }
                })
            }
            if (child) {
                filters.push({
                    person: {
                        child: child
                    }
                })
            }

            if (name) {
                filters.push({
                    person: {
                        OR: [
                            { firstName: { contains: name } },
                            { lastName: { contains: name } },
                        ],
                    }
                })
            }
            const where = {
                deletedAt: null,
                ...(startDate && endDate && { createdAt: { gte: new Date(startDate).toISOString(), lte: new Date(endDate).toISOString() } }),
                ...(date && { date: date }),
                ...(filters.length && {}),
                AND: filters
            }
            console.log(where, 'where')

            const cafeteria = (await client.service.findMany({
                where: { ...where, service: 'CAFETERIA' },
                include: {
                    person: true
                }
            })).map(x => ({ ...x.person, ...x }))

            const takeawayPackage = (await client.service.findMany({
                where: { ...where, service: 'TAKEAWAY_PACKAGE' },
                include: {
                    person: true
                }
            })).map(x => ({ ...x.person, ...x }))

            const showers = (await client.service.findMany({
                where: { ...where, service: 'SHOWERS' },
                include: {
                    person: true
                }
            })).map(x => ({ ...x.person, ...x }))

            const covers = (await client.service.findMany({
                where: { ...where, service: 'COVERS' },
                include: {
                    person: true
                }
            })).map(x => ({ ...x.person, ...x }))

            const medicines = (await client.service.findMany({
                where: { ...where, service: 'MEDICINES' },
                include: {
                    person: true
                }
            })).map(x => ({ ...x.person, ...x }))

            const data = {
                cafeteria,
                takeawayPackage,
                showers,
                covers,
                medicines
            };

            const workbook = new ExcelJS.Workbook();

            Object.entries(data).forEach(([key, records]) => {
                const sheet = workbook.addWorksheet(key.toUpperCase());
                if (!records.length) return; // Continue to the next key

                sheet.addRow(
                    Object.keys(records[0]).map((o) => o.toUpperCase())
                );
                sheet.addRows(records.map((record) => Object.values(record)));

                sheet.eachRow((row, rowNumber) => {
                    row.eachCell((cell) => {
                        (cell.alignment = {
                            vertical: "middle",
                            horizontal: rowNumber === 1 ? "center" : "left",
                        }),
                            (cell.font = {
                                size: rowNumber === 1 ? 16 : 14,
                                bold: rowNumber === 1,
                            });
                        if (rowNumber === 1) {
                            cell.fill = {
                                type: "pattern",
                                pattern: "solid",
                                fgColor: { argb: "DDDDDD" },
                            };
                        }
                    });
                });
                sheet.columns.forEach((column) => {
                    let maxLength = 20;
                    const upperLimit = 40;
                    column["eachCell"]({ includeEmpty: true }, function (cell) {
                        const columnLength =
                            cell.value?.toString()?.length || maxLength;
                        maxLength = Math.max(maxLength, columnLength);
                    });

                    column.width = Math.min(maxLength * 1.2, upperLimit);
                });
            });

            const buffer = await workbook.xlsx.writeBuffer();
            res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.set('Content-Disposition', 'attachment; filename="generated_file.xlsx"');
            res.send(buffer);
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error.message });
        }
    }
};
