'use strict'
// Code from official docs of nodemailer ~Sahil
const nodemailer = require('nodemailer')
const dottenv = require('dotenv')
dottenv.config()

const hostGmail = 'smtp.gmail.com'

// async..await is not allowed in global scope, must use a wrapper
async function main() {
	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing
	// let testAccount = await nodemailer.createTestAccount()

	// I am using same app-password as of mutt client ~sahil
	let testAccount = {user: 'sahilrajput03@gmail.com', pass: process.env.GMAIL_APP_PASS}

	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		// host: 'smtp.ethereal.email',
		host: hostGmail,
		// port: 587, // *not required for gmail ~sahil
		// secure: false, // true for 465, false for other ports // *not required for gmail ~sahil
		auth: {
			user: testAccount.user, // generated ethereal user
			pass: testAccount.pass, // generated ethereal password
		},
	})

	// send mail with defined transport object
	let info = await transporter.sendMail({
		// You can choose any name though like we have Fred Foo 👻 ~sahil
		from: '"Fred Foo 👻" <foo@example.com>', // sender address, fyi: foo@example.com is replaced with your own email though ~sahil
		// to: 'sahilrajput03@gmail.com, baz@example.com', // list of receivers
		to: 'sahilrajput03@gmail.com', // list of receivers
		subject: 'Welcome to world of amazing element!', // Subject line
		// text: 'Hello you there?', // plain text body
		html: '<b>I am html!</b>', // html body
		// Find other common fields like attachment @ https://nodemailer.com/message/
	})

	console.log('Message sent: %s', info.messageId)
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	// console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error)
// Learn: ~Sahil
// Diff b/w text and html? Ans. If both are sent but only html is shown in the email. If only text is sent then text is shown as body of the email. ~sahil
