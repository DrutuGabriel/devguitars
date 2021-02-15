require('dotenv').config();
const mailer = require('nodemailer');
const { welcome } = require('./welcome_template');


const getMailTemplate = (to, name, token, type) => {
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
  }

  return template;
}

const sendMail = (to, name, token, type) => {
  const smtpTransport = mailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mail = getMailTemplate(to,name,token,type);


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