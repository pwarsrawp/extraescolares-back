const nodeMailer = require("nodemailer");

const html = `
    <h1>Hello World</h1>
    <p>This comens from node mailer</p>
`;

async function main() {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "test@test.com",
      pass: "NodeMailer123!",
    },
  });
  const info = await transporter.sendMail({
    from: 'OpenJavaScript',
    to: 'test2@test.com',
    subject: 'Testing, testing, 123'

  });

  console.log('Message sent: ' + info.messageId);
}

main();