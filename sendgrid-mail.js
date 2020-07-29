const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('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');
const sendMail = async (mailCont) => {
    const msg = {
        to: mailCont.email,
        from: 'tejasdahad000@gmail.com',
        subject: 'Account Activation',
        html: `
        <h2>Please click on given link to activate your account</h2>
        <p>http://localhost:3000/authenticate/activate/${mailCont.token}</p>
        `
    };
    console.log('Sending mail');
    await sgMail.send(msg);
    console.log('Mail sent');
}

module.exports = sendMail;
