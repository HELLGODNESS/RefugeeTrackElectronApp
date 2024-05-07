const { PrismaClient } = require('@prisma/client');
const client = new PrismaClient({});
const persons = require('./persons.json');
const { differenceInYears } = require('date-fns');
async function addPersons() {

    let personData = {}
    for (let i = 0; i < persons.length; i++) {
        const { Lcp, exitDate, bornOn, createdAt, id, ...rest } = persons[i]
        if (!personData[i % 100]) personData[i % 100] = []
        personData[i % 100].push({
            ...(new Date(exitDate) != 'Invalid Date' && { exitDate: new Date(exitDate) }),
            ...(new Date(bornOn) != 'Invalid Date' && { bornOn: new Date(bornOn) }),
            ...(new Date(createdAt) != 'Invalid Date' && { createdAt: new Date(createdAt) }),
            ...rest,
        })
    }

    for (const key of Object.keys(personData)) {
        const person = await client.person.createMany({
            data: personData[key]
        })
        console.log(person, 'person ')
    }
    return {
        data: { message: "All Custom Fields Created" }
    }

}



module.exports = addPersons;