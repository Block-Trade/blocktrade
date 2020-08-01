const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SG_SENDGRID_API_KEY.toString());
const sendMail = async (mailCont) => {
    const msg = {
        to: mailCont.email,
        from: 'karankangude17@gmail.com',
        subject: 'Account Activation',
        html: `
        <h2>Please click on given link to activate your account</h2>
        <p>${mailCont.token}</p>
        `
    };
    console.log('Sending mail');
    await sgMail.send(msg);
    console.log('Mail sent');
}

module.exports = sendMail;
