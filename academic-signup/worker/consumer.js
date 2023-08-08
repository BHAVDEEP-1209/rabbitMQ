
async function consumeMessages(){
    try {
        const connection = await global.connectionRabbitMQ;
        const channel = await connection.createChannel();

        console.log("consuming messages!");

        await channel.assertExchange(process.env.RABBIT_EXCHANGE,process.env.RABBIT_TYPE_EXCHANGE);

        const q = await channel.assertQueue(process.env.RABBIT_QUEUE);
        await channel.bindQueue(q.queue,process.env.RABBIT_EXCHANGE,process.env.RABBIT_ROUTING_KEY2);

        channel.consume(q.queue,async(msg)=>{
            const data = JSON.parse(msg.content);
            console.log("data mil gya",data);
            channel.ack(msg);
        })

    } catch (error) {
        console.log("Error while consuming messages!");
    }
}

module.exports = {
    consumeMessages
}

