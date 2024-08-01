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
const twilioPhoneNumber = "+1XXX-XXX-XXXX";

const client = new twilio(accountSid, authToken);

// Generate a random 6-digit code
function generateCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Store the generated codes (in-memory storage for demo purposes ONLY)
const codes = {};

app.use(bodyParser.urlencoded({ extended: false }));

// Serve the index.html file
app.get('/', (req, res) =>{
	res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to initiate the 2FA process
app.post('/send-code', async (req, res) => {
	const countryCode = req.body.countryCode;
  const phoneNumber = req.body.phoneNumber;

  if (!countryCode || !phoneNumber) {
    return res.status(400).send('Country code and phone number are required.');
  }

  const code = generateCode();
  codes[phoneNumber] = code;

  try {
    await client.messages.create({
      body: `Your verification code is: ${code}`,
      from: twilioPhoneNumber,
      to: `${countryCode}${phoneNumber}`,
    });
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
