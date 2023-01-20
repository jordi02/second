const nodemailer = require("nodemailer");
const dotenv = require('dotenv')
dotenv.config()

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: (process.env.SMTP_SECURE === 'true') ? true : false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

async function sendMail(to, subject, text, html) {
    let info = await transporter.sendMail({
        from: '"Coderhouse 32105" <worst@ecommerce.ever>',
        to: [to, process.env.ADMIN_ADDRESS],
        subject: subject,
        text: text,
        html: html
    })
    return info
}

exports.sendMail = sendMail