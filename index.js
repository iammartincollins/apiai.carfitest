'use strict';

const express = require('express');
const timeout = require('connect-timeout');
const bodyParser = require('body-parser');
const processAction = require('./process-action');
const getQuote = require('./getquote');

const restService = express();
restService.use(bodyParser.json());

restService.post('/webhook', function (req, res) {
    try {
        if (req.body && req.body.result) {
            processAction(req.body.result.action, req.body.result).then(data => {
                return res.json({
                    speech: data.speech,
                    displayText: data.displayText,
                    source: 'apiai-webhook-sample',
                    action: data.action
                });
            });
        }
    } catch (err) {
        console.error("Can't process request", err);
        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    }
});

restService.get('/quote', function (req, res) {
    try {
        if (req.query && req.query.QuoteReference) {
            getQuote(req.query.QuoteReference).then(data => {
                console.log(data);
                return res.json(data);
            });
        }
    } catch (err) {
        console.error("Can't process request", err);
        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    }
});

restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});

restService.use(timeout(120000));
restService.use((req, res, next) => {
    if (!req.timedout) next();
});
