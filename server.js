'use strict';

require('dotenv').config();

const config = require('./config/config');
const express = require('express');
const favicon = require('serve-favicon');
const fs = require('fs');
const http = require('http');
const morgan = require('morgan');
const resolve = require('path').resolve;

http.createServer(
    express()
        .use(morgan(config.morgan.format, {
            stream: fs.createWriteStream(resolve(config.morgan.logfile), {
                flags: config.morgan.flags
            })
        }))

        .use(express.static(resolve(process.env.SRC)))

        .use(favicon(resolve(process.env.SRC, config.favicon)))

        .use(`/${config.routes.layers}`, require(resolve(process.env.ROUTES, config.routes.layers)))

        .set('timeout', process.env.TIMEOUT)

        .set('host', process.env.HOST)

        .set('port', process.env.PORT)
)
    .listen(process.env.PORT, process.env.HOST, error =>
    {
        error ?
            console.error(error) :

            console.log(`Active on http://${process.env.LOCALHOST}:${process.env.PORT} at ` +
                `${new Date().toDateString()} ${new Date().toTimeString()}`);
    });
