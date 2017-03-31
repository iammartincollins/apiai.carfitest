'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const sa = require('superagent');

const restService = express();
restService.use(bodyParser.json());

const _buildRequest = (params) => {
    return {
      "Credentials": {
        "apiKey": "5N8Dcfa7435sS8Pbw6",
        "systemKey": "Codeweavers",
        "associatedDealerKey": "",
        "referrer": "https://demoplugins.codeweavers.net/debug/codeweavers/5N8Dcfa7435sS8Pbw6"
      },
      "Customer": {
        "Reference": "58b99a18acddf"
      },
      "Parameters": {
        "Term": params.months,
        "CalculationType": "RegularPayment",
        "Deposit": params.deposit.amount,
        "AnnualMileage": params["annual-mileage"],
        "RegularPayment": 200,
        "Settlement": 0,
        "PartExchange": 0,
        "SpecificProductType": null
      },
      "VehicleRequests": [
        {
          "Dealer": null,
          "Id": "Finance Plugin",
          "Vehicle": {
            "cashPrice": 22948,
            "isNew": false,
            "identifier": "BM2S20SPO5HDTA",
            "identifierType": "caplongcode",
            "type": "car",
            "imageUrl": "http://codeweavers.localiis/content/product-examples/finance-plugins/flexicalc/used/vehicle.jpg",
            "dealerVehicleUrl": "http://codeweavers.localiis//product-examples/finance-plugins/flexicalc/used",
            "currentMileage": "30000",
            "registrationNumber": "DV63NYO",
            "registrationDate": "2015-03-01"
          }
        }
      ],
      "Referrer": "https://demoplugins.codeweavers.net/debug/codeweavers/5N8Dcfa7435sS8Pbw6"
    }
}

var _product_details = {
    lp: 'Lease purchase is a form of conditional sale agreement, which means that the regular payments are similar to a lease/rental agreement but you will own the car at the end of the deal. You may be asked to pay a number of monthly payments at the start of your agreement (referred to as ‘advance payments’ and the leasing equivalent of a deposit) and a sum is usually deferred to the end of the deal.  The deferred sum will be determined by the age and mileage of the car at the end of the agreement. The difference between a lease purchase and a PCP agreement is that the deferred sum (referred to as a Guaranteed Minimum Future Value (GMFV) in a PCP deal) must be paid on a lease purchase agreement. On a PCP, it’s optional.',
    hp: 'Hire Purchase is exactly what it sounds like – a hire agreement which gives you an option to own the car at the end of the agreement. These are normally fixed cost, meaning that the APR (Annual Percentage Rate) is set before the contract begins. The loan period is also fixed – typically three to four years – and the finance agreement is secured against the car being bought, which means that lenders can be flexible in the terms and conditions they offer.',
    pcp: 'Personal Contract Purchase, or PCP, is a variation of a Hire Purchase agreement. The key difference is that the value of the car at the end of the contract is calculated at the start of the agreement and this value is deferred. This deferred sum is usually referred to as the Guaranteed Minimum Future Value (GMFV) and is based on a number of factors including how old the car will be at the end of the agreement and how many miles it is expected to have covered. The future value of the car is guaranteed by the lender so will not fluctuate. Deferring the GMFV to the end of the agreement in this way means that your regular monthly payments are lower than those on a comparable HP agreement over the same term.'
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
                    case 'explain.product':
                        speech = _product_details[requestBody.result.parameters.product];
                    case 'new.calculation':
                        if (!requestBody.result.actionIncomplete) {
                            let params = requestBody.result.parameters;
                             sa
                               .post('https://demoservices.codeweavers.net/public/v3/JsonFinance/Calculate')
                               .send(_buildRequest(params))
                               .set('ContentType', 'application/json')
                               .end(function(err, res){
                                 if (err || !res.ok) {
                                   console.log('Oh no! error');
                                 } else {
                                   console.log('Print me: ' + res.body.VehicleResults[0].FinanceProductResults[0].Quote.QuoteActions.Print);
                                 }
                               });
                        }
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
