// importing app components
const express = require("express");
const app = express();
require("dotenv").config();

// this will have the environment and configuration for the application
const appConfig = require("./core/config");

// function that helps with connecting to database
const connectToDB = require("./core/db").connectToDB;

// function that helps to start the http server
const initServer = require("./core/server").initServer;

// function that helps to start the rpc server
const initRpcServer = require("./core/rpc").initRpcServer;

// connecting to database
connectToDB(appConfig);

// initialising server
initServer(app, appConfig);

// initializing rpc server
initRpcServer(appConfig);

module.exports.server = app;
