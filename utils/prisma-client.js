const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient()
const checkConnection = async () => {
    return client.$connect()
}

const disconnect = async () => {
    return client.$disconnect();
};
module.exports = { client, checkConnection, disconnect };