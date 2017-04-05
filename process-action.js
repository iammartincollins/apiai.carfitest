const Promise = require('promise');
const sa = require('superagent');
const buildRequest = require('./build-request');
const productDetails = require('./product-details');


const process = (action, request) => {
    return new Promise((resolve, reject) => {
        switch (action) {
            case 'explain.product':
                const prodDetails = productDetails(request.parameters.product);
                resolve({
                    speech: prodDetails,
                    displayText: prodDetails
                });
                break;
            case 'new.calculation':
                if (!request.actionIncomplete) {
                    let params = request.parameters;
                    sa
                        .post('https://demoservices.codeweavers.net/public/v3/JsonFinance/Calculate')
                        .send(buildRequest.calc(params))
                        .set('ContentType', 'application/json')
                        .end(function (err, res) {
                            if (err || !res.ok) {
                                reject('Oh no! error');
                            } else {
                                console.log('Print me: ' + res.body.VehicleResults[0].FinanceProductResults[0].Quote.QuoteActions.Print);
                                resolve({
                                    speech: res.body.VehicleResults[0].FinanceProductResults[0].Quote.QuoteActions.Print,
                                    displayText: res.body.VehicleResults[0].FinanceProductResults[0].Quote.QuoteActions.Print
                                });
                            }
                        });
                } else {
                    reject('action not complete');
                }
                break;
            default:
                reject('Action not found');
        }
    });
};

module.exports = process;