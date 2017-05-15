const Promise = require('promise');
const sa = require('superagent');

const get = quoteRef => {
    console.log("getQuote", quoteRef);
    return new Promise((resolve, reject) => {
        resolve({itis: "working"});
        sa
            .get('https://demoservices.codeweavers.net/public/v3/JsonFinance/RetrieveQuote', 'GET')
            .query({
                ApiKey: '5N8Dcfa7435sS8Pbw6',
                QuoteReference: quoteRef,
                Referrer: 'https://demoplugins.codeweavers.net/debug/codeweavers/5N8Dcfa7435sS8Pbw6',
                SystemKey: 'Codeweavers'
            })
            .end((error, response) => {
                if (error || !response.ok) {
                    reject('Oh no! error');
                } else {
                    console.log(response);
                    resolve(response);
                }
            });
    });
};

module.exports = get;