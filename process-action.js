const Promise = require('promise');
const sa = require('superagent');
const buildRequest = require('./build-request');
const productDetails = require('./product-details');

const ACTION_TYPE = {
    LOAD_QUOTE: 'loadQuote',
    NONE: ''
};

const process = (action, request) => {
    return new Promise((resolve, reject) => {
        switch (action) {
            case 'explain.product':
                const prodDetails = productDetails(request.parameters.product);
                resolve({
                    speech: prodDetails,
                    displayText: prodDetails,
                    action: ACTION_TYPE.NONE
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
                                resolve({
                                    speech: res.body.VehicleResults[0].FinanceProductResults[0].Quote.QuoteReference,
                                    displayText: res.body.VehicleResults[0].FinanceProductResults[0].Quote.QuoteReference,
                                    action: ACTION_TYPE.LOAD_QUOTE,
                                    data: res.body
                                });
                            }
                        });
                } else {
                    reject('action not complete');
                }
                break;
            case 'journey.vehicle-search':
                resolve({
                    speech: 'journey.vehicle-search hit',
                    displayText: 'journey.vehicle-search hit'
                });
                break;
            default:
                reject('Action not found');
        }
    });
};

module.exports = process;