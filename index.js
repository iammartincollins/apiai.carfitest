'use strict';

const express = require('express');
const bodyParser = require('body-parser');


const restService = express();
restService.use(bodyParser.json());

var _product_details = {
    lp: 'Lease Purchase details',
    hp: 'Hire Purchase details',
    pcp: 'Personal Contract Purchase details'
};

restService.post('/webhook', function (req, res) {

    console.log('hook request', req);

    try {
        var speech = 'empty speech';

        if (req.body) {
            var requestBody = req.body;

            if (requestBody.result) {
                speech = '';

               switch (requestBody.result.action) {
                    case: 'explain.product':
                        speech = _product_details[requestBody.result.parameters.product];
                }
            }
        }

        console.log('result: ', speech);

        return res.json({
            speech: speech,
            displayText: speech,
            source: 'apiai-webhook-sample'
        });
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
