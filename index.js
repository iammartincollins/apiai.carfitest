'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const processAction = require('./process-action');

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

restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});
