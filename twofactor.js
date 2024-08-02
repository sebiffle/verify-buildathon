const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const path = require('path');

//use environment variables
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySID ='VA8785ede80a8da74e2633a2ef737dea4f';

const client = new twilio(accountSid, authToken);


app.use(bodyParser.urlencoded({ extended: false }));

// Serve the index.html file
app.get('/', (req, res) =>{
	res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to initiate the 2FA process
app.post('/send-code', async (req, res) => {
	const countryCode = req.body.countryCode;
  const phoneNumber = req.body.phoneNumber;
	console.log(req.body)
  if (!countryCode || !phoneNumber) {
    return res.status(400).send('Country code and phone number are required.');
  }

  try {
    const checkResp = await client.verify.v2
    .services('VA8785ede80a8da74e2633a2ef737dea4f')
    .verifications.create({
      channel: 'sms',
      to: '+19703897747',
    });
    console.log('checkResp', checkResp);

    res.send('Verification code sent successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending verification code.');
  }
});

// Endpoint to verify the provided code
app.post('/verify-code', (req, res) => {
	const countryCode = req.body.countryCode;
  const phoneNumber = req.body.phoneNumber;
  const userCode = req.body.code;

  if (!countryCode || !phoneNumber || !userCode) {
    return res.status(400).send('Country code, phone number and code are required.');
  }

  const storedCode = codes[phoneNumber];

  if (!storedCode || storedCode !== parseInt(userCode, 10)) {
    return res.status(401).send('Invalid verification code.');
  }

  // Code is valid, you can proceed with further actions
  // (e.g., mark the user as verified in your database)

  res.send('Verification successful!');

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
