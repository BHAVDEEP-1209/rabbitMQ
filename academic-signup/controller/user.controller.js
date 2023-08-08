const Producer = require("../worker/producer");
const producer = new Producer();

const sign_up_user = async(req,res)=>{
    try {   
        await producer.publishMessage(process.env.RABBIT_ROUTING_KEY,req.body,process.env.RABBIT_SIGNATURE);
        console.log("Message Produced!");
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}

module.exports ={
    sign_up_user
}