// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
var config = require('./config');
const SSLCommerzPayment = require("sslcommerz-lts");
const { log } = require('console');
const axios = require('axios');

const client = require('twilio')(config.accountSid, config.authToken);
require('dotenv').config();

// Create a new Express application
const app = express();

// View engine
app.set('view engine', 'ejs');

// Configure the application to use body-parser middleware for parsing POST requests
app.use(express.urlencoded({ extended: false }));

// Define a route to serve the login page
app.get('/', (req, res) => {
  const query = req.query;
  let values = {
    package_code: "",
    data_volume: "",
    voice_volume: "",
    validity: "",
    cost: "",
    username: "",
    num:"",
  }
  Object.assign(values, query);
  res.render('home', values);
});

// Define a route to handle POST requests to the login form
app.post('/submit', (req, res) => {
  const params = req.body;
  delete params.password; // removing password
  let data = Object.entries(params);
  // encode every parameter (unpack list into 2 variables)
  data = data.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
  // combine into string
  let query = data.join('&');
  console.log(query);
  // Redirect the user to the information page with the username parameter in the URL
  const infoUrl = `/info?${query}`;
  res.redirect(infoUrl);
});

// Define a route to serve the information page
app.get('/info', (req, res) => {
  const query = req.query;
  let values = {
    package_code: "",
    data_volume: "",
    voice_volume: "",
    validity: "",
    cost: "",
    username: "",
    num:"",
  }
  Object.assign(values, query)
  res.render('info', values);
});

app.post('/information', (req, res) => {

  const urlParams = new URL(`https://sandbox.sslcommerz.com/EasyCheckOut/testcde5dedf3d7f5a8ce382aa0e2aefc7bc831?cost_card=${req.body.cost}&num=${req.body.num}`);
  console.log(urlParams);
  const cost = urlParams.searchParams.get('cost_card');
  const num = urlParams.searchParams.get('num');
  console.log("number: ",num);
  const data = {
    total_amount: cost,
    currency: 'BDT',
    tran_id: 'REF123',
    success_url: `http://localhost:4000/success`,
    shipping_method: 'No',
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: 'Customer Name',
    cus_email: 'cust@yahoo.com',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
    cus_fax: '01711111111',
    multi_card_name: 'bkash',//'mastercard',
    value_a: num,

  };
  const sslcommerz = new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_PASSWORD, false) //true for live default false for sandbox
  sslcommerz.init(data).then(data => {
    if (data?.GatewayPageURL) {
      return res.status(200).redirect(`${data?.GatewayPageURL}?cost_card=${req.body.cost}`);
    }
    else {
      return res.status(400).json({
        message: "Session was not successful"
      });
    }
  });
});
//define a route for after payment
app.post('/success', async (req, res) => {
  try{
    const response = await client.messages.create({
      body: "Payment successful!",
      from: 'whatsapp:+14155238886' ,
      to: 'whatsapp:+' +req.body.value_a,
    });
    res.render('payment_success');
    // res.redirect('http://localhost:3000/api/draft1')
  } catch(err) {
    console.log(err);
    res.status(500).send(err.message)
  }
})

//for bill-payment
app.get('/bill-payment', (req, res) => {
  const { customerNumber, billNumber, billMonth, amount } = req.query;
  res.render('bill-payment', { customerNumber, billNumber, billMonth, amount });
});

//bill process
app.post('/process-payment', (req, res) => {
  const { customerNumber, billNumber, billMonth, amount } = req.body;
  const data = {
    total_amount: amount,
    currency: 'BDT',
    tran_id: 'REF123',
    success_url: `http://localhost:4000/success`,
    shipping_method: 'No',
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: 'Customer Name',
    cus_email: 'cust@yahoo.com',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
    cus_fax: '01711111111',
    multi_card_name: 'mastercard',
    value_a: num, //'8801521428707',//num,//billNumber,

  };
  const sslcommerz = new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_PASSWORD, false) //true for live default false for sandbox
  sslcommerz.init(data).then(data => {
   
    if (data?.GatewayPageURL) {
      return res.status(200).redirect(`${data?.GatewayPageURL}?cost_card=${req.body.amount}`);
    }
    else {
      return res.status(400).json({
        message: "Session was not successful"
      });
    }
  }).catch(err => {
    console.log(err);
    return res.status(500).json({
      message: err.message
    });
  });
});

// Start the server
app.listen(config.port, config.host, () => {
  console.log(`Server started on http://${config.host}:${config.port}`);
});