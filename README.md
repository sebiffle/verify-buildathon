# SMS OTP -> Verify Twilio Build-a-thon!

### Instructions for Twilio's Verify Build-a-thon. We are so happy to have you building with us. We will leverage this application to walk through replacing SMS OTP with Twilio Verify.

## Prerequisites
Before you begin, ensure you have the following:
- [ ] Twilio Account: For creating a Verify Service
- [ ] Twilio Account Credentials: You will need these in order to use the application to send out OTP  

## This Application:
- A very basic HTML/CSS/JS application which allows a user to input their phone number and verify an OTP sent to them using Twilio.
- twofactor.js and sms_original.js are the same
- sms_original.js is the version of the project we'll be starting with while working in twofactor.js.
    - This file has the application setup to create and send an OTP over Twilio Programmable Messaging and to check the user input code within the application.
- verify_lookup_final.js is the version of the project we'll end with while working in twofactor.js.
    - This file has the application setup to leverage Twilio Verify to send an OTP and to check the user input code through Verify as well. 

## Setup
If you installed git you can clone the code to your machine, or download a ZIP of all the files directly.

Download the ZIP from this location, or run the following git command to clone the files to your machine:

git clone https://github.com/sebiffle/verify-buildathon.git

- Once the files are on your machine, open the twofactor.js file
- You can run this application through the following command: node twofactor.js
- You will need to provide an Account SID and Auth Token to complete this build. Don't know where those are? Check out your [API Credentials Here](https://www.twilio.com/docs/iam/credentials/api)
        - We recommend storing these values in a .env file.  

## Resources within the presentation
- [Twilio Verify](https://www.twilio.com/docs/verify/api)
    - [Send OTP](https://www.twilio.com/docs/verify/api/verification#start-new-verification)
    - [Check OTP](https://www.twilio.com/docs/verify/api/verification-check)
- [Twilio Lookup](https://www.twilio.com/docs/lookup)
    - [Line Type Intelligence](https://www.twilio.com/docs/lookup/v2-api/line-type-intelligence)


## Thank you so much, we cannot wait to see what you build!
