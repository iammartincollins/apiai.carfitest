const get = quoteRef => {
    return new Promise((resolve, reject) => {
        sa
            .get('https://demoservices.codeweavers.net/public/v3/JsonFinance/RetrieveQuote', 'GET')
            .query({
                ApiKey: '5N8Dcfa7435sS8Pbw6',
                QuoteReference: quoteReference,
                Referrer: 'https://demoplugins.codeweavers.net/debug/codeweavers/5N8Dcfa7435sS8Pbw6',
                SystemKey: 'Codeweavers'
            })
            .end((error, response) => {
                if (err || !res.ok) {
                    reject('Oh no! error');
                } else
                    resolve(response);
                }
            });
    });
};

module.exports = get;