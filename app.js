const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mysql = require('mysql2');
const app = express();

// Middleware for parsing JSON and form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'payal2003',
  database: 'mail_app'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// Route to send email
app.post('/send-email', (req, res) => {
  const { email, subject, message, smtpHost, smtpPort, smtpUser, smtpPass } = req.body;
  
  // Setup Nodemailer transporter with provided SMTP details
  let transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: false, // Use TLS/SSL or not
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });

  let mailOptions = {
    from: smtpUser,
    to: email,
    subject: subject,
    text: message
  };

  // Send mail and save the sent email details to the database
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }

    // Save sent email details in MySQL database
    const sql = 'INSERT INTO sent_emails (email, subject, message) VALUES (?, ?, ?)';
    db.query(sql, [email, subject, message], (err, result) => {
      if (err) throw err;
      res.status(200).send('Email sent and saved in the database.');
    });
  });
});

// Starting the server on port 3000
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
