import nodemailer from 'nodemailer';

export class Email {
  static transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'mohmmedlaeh81@gmail.com',
      pass: process.env.EMAIL_PASS || 'rhhkvwjgtdmerntv'
    }
  });

  static async sendEmail(to, subject, htmlContent) {
    const mailOptions = {
        from: process.env.EMAIL_USER || 'mohmmedlaeh81@gmail.com',
        to,
        subject,
        html: htmlContent
    };

    try {
        console.log('Sending email with options:', mailOptions);
        const info = await Email.transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info);
        return info; 
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

  static generateEmailContent(name, email, password) {
    return `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #f9f9f9;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .header h1 {
            color: #007bff;
          }
          .content {
            margin-bottom: 20px;
          }
          .footer {
            text-align: center;
            font-size: 0.9em;
            color: #666;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 10px 0;
            color: #fff;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to the Course!</h1>
          </div>
          <div class="content">
            <p>Hello ${name},</p>
            <p>You have been successfully added to the course by the formateur.</p>
            <p>Your account details are as follows:</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Password:</strong> ${password}</p>
            <a href="http://localhost:3000/login" class="button">Log In</a>
          </div>
          <div class="footer">
            <p>Best regards,<br>Your Learning Team</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}


