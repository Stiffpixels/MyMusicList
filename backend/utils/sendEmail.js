const nodemailer = require('nodemailer')

const sendEMail = async (options) =>{
    const transporter = nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        service:process.env.SMTP_SERVICE,
        auth:{
            user:process.env.SMTP_EMAIL,
            pass:process.env.SMTP_PASSWORD
        },
        tls:{
            rejectUnauthorized:false
        }
    })

    const mailOptions = {
        from:`'My Music List' <${process.env.SMTP_EMAIL}>`,
        to:options.email,
        subject:options.subject,
        text:options.message
    }

    await transporter.sendMail(mailOptions)
}

module.exports = sendEMail;