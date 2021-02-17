require('dotenv').config();
const mailer = require('nodemailer');
const { welcome } = require('./welcome_template');
const { purchase } = require('./purchase_template');


const getMailTemplate = (to, name, token, type, actionData) => {
  let template = null;

  switch(type){
    case 'welcome':
      template = {
          from: 'DevGuitars <johnydoestests@gmail.com>',
          to: to,
          subject: `Welcome to devguitars ${name}`,
          html:  welcome()
      }
      break;
    case 'purchase':
      template = {
          from: 'DevGuitars <johnydoestests@gmail.com>',
          to: to,
          subject: `Thanks for shopping with us ${name}`,
          html:  purchase(actionData)
      }
      break;
  }

  return template;
}

const sendMail = (to, name, token, type, actionData = null) => {
  const smtpTransport = mailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mail = getMailTemplate(to, name, token, type, actionData);


  smtpTransport.sendMail(mail, function(err, response){
    if(err){ 
      console.log(err);
    } else {
      console.log('Mail sent');
    }

    smtpTransport.close();
  });

}

module.exports = { sendMail };