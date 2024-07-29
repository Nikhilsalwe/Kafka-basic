const { kafka } = require('./client.js');

async function init() {
    const admin = kafka.admin();

    console.log("admin connected ...")
    await admin.connect();
    console.log("admin disconnected ....")

    console.log("Topic creation ....")

    await admin.createTopics({
        topics: [{
            topic: "rider-updates",
            numPartitions: 2
        }]
    })

    console.log("Topic created ....")

    console.log("admin disconnect ....")

    await admin.disconnect();
}

init();
