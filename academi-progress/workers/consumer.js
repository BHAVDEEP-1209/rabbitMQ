// const process_user_data = require("../processor/user.processor");

async function consumeMessages(){
    try {
        const connection = await global.connectionRabbitMQ;
        const channel = await connection.createChannel();

        await channel.assertExchange(process.env.RABBIT_EXCHANGE,"fanout");

        const q = await channel.assertQueue(process.env.RABBIT_QUEUE);
        await channel.bindQueue(q.queue,process.env.RABBIT_ROUTING_KEY,'');

        channel.consume(q.queue,async(msg)=>{

            if(checkHeaderType(msg)){
                const data = JSON.parse(msg.content);
                // const response = await process_user_data(data);
                if(response.success){
                    console.log("happy!");
                }else{
                    console.log("sad!");
                }
            }else{
                console.log("ignoring messages!");
            }
            channel.ack(msg);
        })

    } catch (error) {
        console.log("Error while consuming messages!");
    }
}

function checkHeaderType (msg) {
   if(msg?.properties?.type) {
        if(!msg.properties.hasOwnProperty('type')) return false
        if(msg.properties.type != process.env.RABBIT_SIGNATURE) return false
        return true
    }else{
        return false
    }
}

module.exports = {
    consumeMessages
}

