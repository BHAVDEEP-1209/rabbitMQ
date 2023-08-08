const amqp = require("amqplib");
const {consumeMessages} = require("../workers/consumer");
let timeout , connection , credentials

const connectRabbitMQ = async ()=>{
    try {
        credentials = {
            credentials : amqp.credentials.plain(process.env.RABBIT_USERNAME,process.env.RABBIT_PASSWORD)
        }
        connection = await amqp.connect("amqp://localhost");

        console.log("rabbit mq connected");

        consumeMessages();
        return connection
    } catch (error) {
        console.log(error.message);

        if(timeout)clearTimeout(timeout);
         reconnect();
    }
}

const reconnect=()=>{
    timeout = setTimeout(()=>{
        console.log("Reconnecting to rabbitMQ");
        global.connectionRabbitMQ = connectRabbitMQ();
    },5000)
}


module.exports = {
    connectRabbitMQ
}

