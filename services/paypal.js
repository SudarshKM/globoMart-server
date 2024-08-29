const axios = require("axios");
// const { response } = require("express");
const fetch = require("node-fetch")
// var fetch = require('node-fetch');


const generateAccessToken = async () => {
  const response = await axios({
    url: process.env.PAYPAL_BASE_URL + "/v2/oauth2/token",
    method: "post",
    data: "grant_type=client_credentials",
    auth: {
      username: process.env.PAYPAL_CLIENT_ID,
      password: process.env.PAYPAL_SECRET,
    },
  });

  return response.data.access_token;

  // console.log(response.data.access_token);
  
};

    



exports.createOrder = async () => {
  const accessToken = await generateAccessToken()

  const response = await axios({
      url: process.env.PAYPAL_BASE_URL + '/v2/checkout/orders',
      method: 'post',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
      },
      data: JSON.stringify({
          intent: 'CAPTURE',
          purchase_units: [
              {
                  items: [
                      {
                          name: 'Node.js Complete Course',
                          description: 'Node.js Complete Course with Express and MongoDB',
                          quantity: 1,
                          unit_amount: {
                              currency_code: 'USD',
                              value: '100.00'
                          }
                      }
                  ],

                  amount: {
                      currency_code: 'USD',
                      value: '100.00',
                      breakdown: {
                          item_total: {
                              currency_code: 'USD',
                              value: '100.00'
                          }
                      }
                  }
              }
          ],

          application_context: {
              return_url: process.env.BASE_URL + '/complete-order',
              cancel_url: process.env.BASE_URL + '/cancel-order',
              shipping_preference: 'NO_SHIPPING',
              user_action: 'PAY_NOW',
              brand_name: 'manfra.io'
          }
      })
  })
console.log(response.data);

  // return response.data.links.find(link => link.rel === 'approve').href
}


this.createOrder()

 









 




// generateAccessToken()

  // "A21AAJfQ9hCo3xfb-LcPrh_79B_xMv6xcADsVitpCMEpZ4WCYgA05-gEzDye6Pze-xVX9oPWueCqL0nn2qEcvtK_1qXHPfyEA";

// exports.createOrder = async (req, res) => {

//   const accessToken = await generateAccessToken()

//   const response = await axios({
//     url: "https://api-m.paypal.com/v2/checkout/orders",
//     method: "post",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": "Bearer " + accessToken,
//     },
//     data: JSON.stringify({
//       intent: "CAPTURE",
//       purchase_units: [
//         {
//           items: [
//             {
//               name: "GloboMart Product",
//               description: "GloboMart Product description",
//               quantity: 1,
//               unit_amout: {
//                 currency_code: "USD",
//                 value: "100.00",
//               },
//             },
//           ],
//           amount: {
//             currency_code: "USD",
//             value: "100.00",
//             breakdown: {
//               item_total: {
//                 currency_code: "USD",
//                 value: "100.00",
//               },
//             },
//           },
//         },
//       ],
//       application_contex: {
//         return_url: process.env.BASE_URL + "/complete-order",
//         cancel_url: process.env.BASE_URL + "/cancel-order",
//       },
//     }),
//   });

//   console.log(response);
// };

// this.createOrder()



exports.order = async (req, res) => {
  fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "PayPal-Request-Id": "7b92603e-77ed-4896-8e78-5dea2050476a",
      Authorization:
        "Bearer A21AALopCPEhxsbQYpq7XM3kOHp-buI4WvtnWYYA9V85HOKV5tAsEeZFBHVh8eHrhd_uGaWdSZBeXS9rFrqr5qVCzuqHy29Vg"
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: "d9f80740-38f0-11e8-b467-0ed5f89f718b",
          amount: { currency_code: "USD", value: "100.00" },
        },
      ],
      payment_source: {
        paypal: {
          experience_context: {
            payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
            brand_name: "GloboMart",
            locale: "en-US",
            landing_page: "LOGIN",
            shipping_preference: "SET_PROVIDED_ADDRESS",
            user_action: "PAY_NOW",
            return_url: "https://localhost:4000/returnUrl",
            cancel_url: "https://localhost:4000/cancelUrl",
          },
        },
      },
    }),
  }).then((res)=>{
    console.log(res);
    
  });
};

// this.order()

// exports.orderV1=async(req,res)=>{

// fetch('https://api-m.sandbox.paypal.com/v1/checkout/orders', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json; charset=UTF-8'
//     },
//     body: JSON.stringify({ "application_context": { "locale": "en-US", "brand_name": "walmart", "landing_page": "billing", "user_action": "continue", "supplementary_data": [ { "name": "risk_correlation_id", "value": "9N8554567F903282T" }, { "name": "buyer_ipaddress", "value": "109.20.212.116" }, { "name": "external_channel", "value": "WEB" } ] }, "purchase_units": [ { "reference_id": "store_mobile_world_order_1234", "description": "Mobile World Store order-1234", "amount": { "currency": "USD", "details": { "subtotal": "1.09", "shipping": "0.02", "tax": "0.33" }, "total": "1.44" }, "payee": { "email": "seller@example.com" }, "items": [ { "name": "NeoPhone", "sku": "sku03", "price": "0.54", "currency": "USD", "quantity": "1" }, { "name": "Fitness Watch", "sku": "sku04", "price": "0.55", "currency": "USD", "quantity": "1" } ], "shipping_address": { "line1": "2211 N First Street", "line2": "Building 17", "city": "San Jose", "country_code": "US", "postal_code": "95131", "state": "CA", "phone": "(123) 456-7890" }, "shipping_method": "United Postal Service", "partner_fee_details": { "receiver": { "email": "partner@example.com" }, "amount": { "value": "0.01", "currency": "USD" } }, "payment_linked_group": 1, "custom": "custom_value_2388", "invoice_number": "invoice_number_2388", "payment_descriptor": "Payment Mobile World" } ], "redirect_urls": { "return_url": "https://example.com/return", "cancel_url": "https://example.com/cancel" } })
// }).then((res)=>{
//   console.log(res);
  
// });

// }
// this.orderV1()