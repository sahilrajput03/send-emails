'use strict';

// Source: From official docs of nodemailer.
const nodemailer = require('nodemailer');
const dottenv = require('dotenv');
dottenv.config();

const hostGmail = 'smtp.gmail.com';

async function main() {
	// Learn: Generate test SMTP service account from https://ethereal.email
	// 		  Only needed if you don't have a real mail account for testing.
	// let testAccount = await nodemailer.createTestAccount()
	// console.log('testAccount.user', testAccount.user, 'testAccount.pass?', testAccount.pass)

	// Note: I am using same app-password as of mutt client. You can
	//       have your app password by going to: https://myaccount.google.com/apppasswords
	let testAccount = { user: 'sahilrajput03@gmail.com', pass: process.env.GMAIL_APP_PASS };

	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		// host: 'smtp.ethereal.email',
		host: hostGmail,
		port: 587, // (default= 587)
		// secure: true, // (default=false), we need it set it to `true` for port 465. For Gmail both `false`/`true` works [TESTED].
		auth: {
			user: testAccount.user,
			pass: testAccount.pass,
		},
	});


	try {
		// Send mail with defined transport object
		let info = await transporter.sendMail({
			// Learn: `from` (sender address) is optional but if you set
			// 		  it to a value like `foo@example.com` then it would be
			// 		  replaced with your own email which you actually used to
			// 		  send the email.
			from: '"Fred Foo 👻" <foo@example.com>',
			// Learn: `to` can be a list of receivers.
			// to: 'sahilrajput03@gmail.com, baz@example.com',
			to: 'sahilrajput03@gmail.com',
			subject: 'Welcome to awesome world!',
			// Learn: `text` can be plain text text or html.
			// text: 'Hello you there?',
			// Learn: Diff b/w `text` and `html`? Ans. If you send both then
			// 		  only html is shown in the email.
			html: '<b>I am html!</b>',
			// Find other common fields like attachment, etc: https://nodemailer.com/message
		});

		console.log('Message sent: %s', info.messageId);
		// Output: Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

		// Learn: Preview only available when sending through an Ethereal account
		// console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
		// Output: Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
	} catch (error) {
		console.error('Error?', error);
	}
}

main();
