const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const {
  APP_PASSWORD,
  EMAIL_USER_EMAIL,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_SERVICE,
} = process.env;

const options = {
  service: EMAIL_SERVICE,
  port: EMAIL_PORT,
  host: EMAIL_HOST,
  secure: true,
  auth: {
    user: EMAIL_USER_EMAIL,
    pass: APP_PASSWORD,
  },
};

const generateHtml = (content, name, email) => {
  let html = '';
  html += '<h1>From</h1>';
  html += `<p><b>Name:</b> ${name}</p>`;
  html += `<p><b>Email: </b> ${email}</p>`;
  html += '<h1>Mail Content</h1>';
  html += `<p>${content}</p>`;
  return html;
};

app.post('/api/send_email', async (req, res) => {
  const {
    email, subject, content, name,
  } = req.body;

  console.log('CONTENT', content.split('\n').filter((a) => a !== ''));

  if (!email) {
    return res.status(400).send({ error: true, message: 'No email provided' });
  }
  if (!subject) {
    return res.status(400).send({ error: true, message: 'No subject provided' });
  }
  if (!content) {
    return res.status(400).send({ error: true, message: 'No content provided' });
  }
  if (!name) {
    return res.status(400).send({ error: true, message: 'No name provided' });
  }

  const transporter = nodemailer.createTransport(smtpTransport(options));

  const formattedContent = content.split('\n').filter((line) => line !== '').join('<br/><br/>');

  const mailOptions = {
    from: email,
    to: 'stephen.higgins1995@gmail.com',
    subject,
    html: generateHtml(formattedContent, name, email),
  };

  let x = '';

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('ERROR', error);
      return res.status(400).send({ error: true, message: error });
    }
    console.log(`Email sent: ${info.response}`);
    x = info.response;
    return res.status(200).send({ error: false, message: info.response });
  });

  console.log('email response', x);
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
