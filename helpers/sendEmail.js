const nodemailer = require('nodemailer');
require('dotenv').config();

const { USER, META_PASSWORD} = process.env;

const config = {
    host: 'smtp.meta.ua',
    port: 465,
    secure: true,
    auth: {
        user: `${USER}`,
        pass: `${META_PASSWORD}`
    },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = async({ to, subject, html }) => {
    const emailData = { 
        from: `${USER}`, 
        to, 
        subject, 
        html,
    };

        return await transporter.sendMail(emailData)
        .then(info => console.log(info))
        .catch(err => console.log(err));   
}

module.exports = sendEmail;

  