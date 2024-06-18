const nodemailer = require('nodemailer');

const sendEmail = async options => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: 'NoReplay <smart.class383@gmail.com>', 
    to: options.email,
    subject: options.subject,
    messageId: options.messageId,
    html: options.html,
    text: options.message,
    headers: {
      'Message-ID': `<${Date.now()}-${Math.random()}@example.com>`,
      'In-Reply-To': '',
      'References': ''
  }
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
