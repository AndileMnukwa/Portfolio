const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail', // Or another SMTP service
        auth: {
            user: 'yourEmail@gmail.com', // Your email address
            pass: 'yourPassword', // Your email password
        },
    });

    const mailOptions = {
        from: email,
        to: 'yourEmail@gmail.com', // Where to send the email
        subject: `${subject} from ${name}`,
        text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage:\n${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
