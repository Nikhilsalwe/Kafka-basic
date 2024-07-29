const { kafka } = require('./client')
const readLine = require('readline')

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function init() {
    const producer = kafka.producer()

    console.log("Connecting producer...")

    await producer.connect()

    console.log("Connection producer successfully...")

    rl.setPrompt('> ')
    rl.prompt()


    rl.on('line', async function (line) {
        const [riderName, riderLoc] = line.split(' ')
        await producer.send({
            topic: "rider-updates",
            messages: [{
                partition: riderLoc.toLowerCase() === 'north' ? 0 : 1,
                key: "location-updates",
                value: JSON.stringify({ name: riderName, loc: riderLoc })
            }]
        })
    }).on('close', async () => {
        await producer.disconnect()
    })
}

init()