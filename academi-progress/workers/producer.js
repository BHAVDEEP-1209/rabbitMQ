const amqp = require('amqplib');

class Producer {
    channel;

    async createChannel() {
        const connection = await global.connectRabbitMQ;
        this.channel = await connection.createChannel();
    }

    async publishMessage(routingKey,message) {
        if(!this.channel) {
            await this.createChannel();
        }

        await this.channel.assertExchange(process.env.RABBIT_EXCHANGE, process.env.RABBIT_TYPE_EXCHANGE);
        
        const publishDetails = {
            fired_at: new Date(),
            message : message
        };

        await this.channel.publish(
            process.env.RABBIT_EXCHANGE,
            routingKey,
            Buffer.from(JSON.stringify(publishDetails)),
        )

        console.log(`This message ${message} is sent to exchange ${process.env.RABBIT_EXCHANGE}`);
    }
}

module.exports = Producer;