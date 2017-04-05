module.exports.calc = (params) => {
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
            "RegularPayment": params["monthly-payment"].amount,
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
};
