const nodemailer = require('nodemailer')

module.exports = async (email,subject,text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: 'sanjay.tecocraft@gmail.com',
                pass: 'dxhnmvjueyzexiaq',
            }
        })
        await transporter.sendMail({
            from: 'sanjay.tecocraft@gmail.com',
            to: email,  
            subject: subject,
            text:text
        })
        console.log('Email send successfully');
    } catch(error) {
        console.log(error,'Email not send');
    }
}