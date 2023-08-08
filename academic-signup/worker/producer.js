const amqp = require('amqplib');

class Producer{
    channel;

    async createChannel(){
        const connection = await global.connectionRabbitMQ;
        this.channel = await connection.createChannel();
    }

    async publishMessage(routingKey,message,signature){
        if(!this.channel){
            await this.createChannel();
        }

        await this.channel.assertExchange(process.env.RABBIT_EXCHANGE, process.env.RABBIT_TYPE_EXCHANGE);

        const properties = {
            type: signature
        }

        const publishDetails  = {
            fired_at : new Date(),
            user : message
        }

        await this.channel.publish(
            process.env.RABBIT_EXCHANGE,
            routingKey,
            Buffer.from(JSON.stringify(publishDetails)),
            properties
        )

        console.log(`This message is sent to exchange ${process.env.RABBIT_EXCHANGE}`);
    }
}

module.exports = Producer;