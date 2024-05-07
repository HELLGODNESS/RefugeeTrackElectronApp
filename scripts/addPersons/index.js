const addPersons = require('./addPersons');

(async function main() {
    try {
        await addPersons()
    } catch (err) {
        console.log('ERROR =>>> : ', err)
    }
})()