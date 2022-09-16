// @ts-nocheck
// @ts-ignore
'use strict'
// Code from official docs of nodemailer ~Sahil
const nodemailer = require('nodemailer')
const dottenv = require('dotenv')
const data = require('./data')
console.log('got data?', data)

dottenv.config()

const hostGmail = 'smtp.gmail.com'

const templateSubject = (name) => `Hello ${name}, I need some personal advice.`

const templateBody = (name) => `
Hello ${name}, how are you doing?

I started working on this project Totel (with Jimmy)  and I want to know feedback on this project from the side. And experience with working with Jimmy if you can share it.

--
Thanks & Regards
Sahil Rajput
sahilrajput03@gmail.com
`

// async..await is not allowed in global scope, must use a wrapper
async function main() {
	let testAccount = {user: 'sahilrajput03@gmail.com', pass: process.env.GMAIL_APP_PASS}

	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: hostGmail,
		auth: {
			user: testAccount.user, // generated ethereal user
			pass: testAccount.pass, // generated ethereal password
		},
	})

	const getName = (tuple) => tuple.slice(0, tuple.lastIndexOf(' '))
	const getEmail = (tuple) => tuple.slice(tuple.lastIndexOf(' '))

	data.forEach(async (tuple) => {
		const name = getName(tuple)
		const email = getEmail(tuple)

		// send mail with defined transport object
		let info = await transporter.sendMail({
			to: email,
			subject: templateSubject(name),
			text: templateBody(name),
		})

		console.log('Message sent: %s', info.messageId)
		// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
	})
}

main().catch(console.error)
