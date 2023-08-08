require("dotenv").config();

global.argv = process.argv.slice(2);
global.listeningPort = argv[0] || process.env.PORT;

if(!global.listeningPort){
    console.log("Port is not defined!");
    process.exit(128);
}

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

// connecting rabbitMQ
const {connectRabbitMQ} = require('./config/rabbitMQ2');
global.connectionRabbitMQ = connectRabbitMQ();

app.use(require("./routes"));

app.listen(global.listeningPort,()=>{
    console.log(`Server is listening on port ${global.listeningPort}`);
})
