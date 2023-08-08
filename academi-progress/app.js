require("dotenv").config();

global.argv = process.argv.slice(2);
global.listeningPort = argv[0] || process.env.PORT;

if(!global.listeningPort){
    console.log("port is not defined!");
    process.exit(128);
}

const express = require("express");
const amqp = require("amqplib");

// connecting rabbitMQ
const { connectRabbitMQ } = require("./config/rabbitMQ");
global.connectionRabbitMQ = connectRabbitMQ();
