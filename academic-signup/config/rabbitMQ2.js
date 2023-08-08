const amqp = require("amqplib");
const { consumeMessages } = require("../worker/consumer");
let timeout , connection 

async function connectRabbitMQ(){
    try {
        connection = await amqp.connect("amqp://localhost");

        connection.addListener("close",()=>{

            console.log("Rabbit MQ disconnected!");
            if(timeout)clearTimeout(timeout);

            reconnect();
        })
        console.log("RabbitMQ2 connected!");

        // consumeMessages();
        return connection;
        } catch (error) {
        console.log("Error connecting to rabbitMQ",error.message);

        if(timeout)clearTimeout(timeout);
        reconnect();
    }
}

function reconnect(){
    timeout = setTimeout(()=>{
        global.connectionRabbitMQ = connectRabbitMQ();
    },5000)
}

module.exports = {
    connectRabbitMQ
}