const Producer = require("../workers/producer");
const producer = new Producer();

const process_user_data = async(payload)=>{
    try {   
        const userData = {...payload};

        await producer.publishMessage(process.env.RABBIT_ROUTING_KEY2,
            "user Progress created using progress-schema!"
        )     
        return {success: true , data : userData};
    } catch (error) {
        // console.log(`Error while processing consumer data ${error.message}`);
        console.log("messag error sent!!!!!!!!!");
        return {success : false , error : error.message}
    }
}

module.exports = process_user_data