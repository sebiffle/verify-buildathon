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
const verifySID ='VA6bc8566688f7b8ab0dff609a024cb2f0';

const client = new twilio(accountSid, authToken);

app.use(bodyParser.urlencoded({ extended: false }));

// Serve the index.html file
app.get('/', (req, res) =>{
	res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to check number type
app.post('/check-number', async (req, res) => {
	const countryCode = req.body.countryCode;
  const phoneNumber = req.body.phoneNumber;

  if (!countryCode || !phoneNumber) {
    return res.status(400).send('Country code and phone number are required.');
  }

  try {
  	const checkNumber = await client.lookups.v2.phoneNumbers(`${countryCode}${phoneNumber}`)
		.fetch({fields:'line_type_intelligence'})
		.then(phone_number => console.log(phone_number.lineTypeIntelligence))

		res.send('Number was successfully checked!')
  } catch (error) {
    console.error(error);
    res.status(500).send('Error checking number.');
  }
});

// Endpoint to initiate the 2FA process
app.post('/send-code', async (req, res) => {
	const countryCode = req.body.countryCode;
  const phoneNumber = req.body.phoneNumber;

  if (!countryCode || !phoneNumber) {
    return res.status(400).send('Country code and phone number are required.');
  }

  try {
  	const checkResp = await client.verify.v2.services(verifySID)
		.verifications
		.create({to: `${countryCode}${phoneNumber}`, channel: 'sms'})
		console.log(checkResp);

		res.send('Verification code sent successfully!')
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending verification code.');
  }
});

// Endpoint to verify the provided code
app.post('/verify-code', async (req, res) => {
	const countryCode = req.body.countryCode;
  const phoneNumber = req.body.phoneNumber;
  const userCode = req.body.code;

  if (!countryCode || !phoneNumber || !userCode) {
    return res.status(400).send('Country code, phone number and code are required.');
  }
	try {
		const verifyCheck = await client.verify.v2.services(verifySID)
		.verificationChecks
		.create({to:`${countryCode}${phoneNumber}`, code: userCode});

		if (verifyCheck.status === 'approved') {
			res.send("verification success!");
		} else {
			res.status(401).send('Error verifying the code')
		}
	} catch (error) {
		console.log(error);
		res.status(500).send('Error sending code')
	}
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
