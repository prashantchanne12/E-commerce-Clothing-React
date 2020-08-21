const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
// const compression = require('compression');

const enforce = require('express-sslify');

if (process.env.NODE_ENV != 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Using express to make backend server
const app = express();

// Server will be on different port than the front-end
// process port will be assigned by Heroku or any server
const port = process.env.PORT || 5000;

// app.use(compression);
app.use(bodyParser.json()); // convert to json
app.use(bodyParser.urlencoded({ extended: true })); // encoding URLs. ex: URLs which contains spaces, symbols will escaped

app.use(enforce.HTTPS({ trustProtoHeader: true }));

// CORS - Cross Origin Requests
// When our front-end makes request to back-end what cors does is ( It's on most servers bydefault ) it checks to make sure that the origin same. Thats means it checks that the request is coming from same server.If its not the same then it denies the request
app.use(cors());

if (process.env.NODE_ENV == 'production') {

    // Serve our static build files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // send response with static files when GET request comes 
    // * -> any route
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, error => {
    if (error) throw error;
    console.log('Server running on port: ' + port);
});

app.get('/serivce-worker.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'serivce-worker.js'));
});

app.post('/payment', (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    };

    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).send({ error: stripeErr });
        } else {
            res.status(200).send({ success: stripeRes });
        }
    });
});