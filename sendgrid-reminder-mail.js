const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SG_SENDGRID_API_KEY.toString());
sgMail.setSubstitutionWrappers('{{', '}}');
const sendReminderMail = async (mailCont) => {
  const msg = {
    to: mailCont.email,
    from: 'karankangude17@gmail.com',
    text: 'Blocktrade',
    subject: 'Payment Reminder',
    html: `<h3>We kindly remind you about your payment to be done </h3>
           <p>Trade Id: ${mailCont.tradeId}</p>
           <p>Username: ${mailCont.username}</p>
           <p>Amount : <b>${mailCont.amount}</b></p>`,
    substitutions: {
      token: mailCont.token,
    },
  };
  console.log('Sending  reminder mail');
  await sgMail.send(msg);
  console.log('Mail sent');
};

module.exports = sendReminderMail;
