const dotenv = require('dotenv')
const twilio = require('twilio')
const logger = require('../controllers/logControl');
dotenv.config()

const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const client = new twilio(accountSid, authToken)

async function sendTwilioMessage(body, to) {
    client.messages.create({
        body: body,
        to: to,
        from: process.env.TWILIO_NUMBER
    }).then((msg) => logger.info(`sent sms ${msg.sid}`))
}
async function sendWhatsappMessage(body, to) {
    client.messages.create({
        body: body,
        to: `whatsapp:${to}`,
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`
    }).then(wpp => logger.info(`sent whatsapp msg ${wpp.sid}`))
}



exports.sendTwilioMessage = sendTwilioMessage
exports.sendWhatsappMessage = sendWhatsappMessage