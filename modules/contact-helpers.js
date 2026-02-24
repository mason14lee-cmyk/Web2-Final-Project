// validates an email address (returns true it is valid, false if it is not)
function isValidEmailAddress(email){
  // a regular expression that checks if a string matches the pattern of an email address.
  var regExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regExp.test(email);
}

// checks a string to see if a URL is in it (returns true if the string has a URL in it, false if not)
// (if there is a URL in the form data, then we consider it to be SPAM!)
function containsURL(str){
  // a regular expression that checks if a string contains a URL
  var regExp = /\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i;
  return regExp.test(str);
}

function isValidContactFormSubmit(firstName, lastName, email, comments){
  // make sure none of the params are empty
  if(firstName && lastName && email && comments){
    // make sure no SPAM has been included in the form
    if(containsURL(firstName) || containsURL(lastName) || containsURL(comments)){
      return false;
    }
    // make sure the email address is valid
    if(!isValidEmailAddress(email)){
      return false;
    }
    // if everything passes validation, then return true
    return true;
  }

  return false;

}

function sendEmailNotification(message, callback){

  // import the node mailer package
  const nodemailer = require('nodemailer');

  const DOMAIN = "masonolson.westernstudent.com" // ex: mywebsite.com
  const EMAIL_SERVER = "mail." + DOMAIN;
  const EMAIL_ADDRESS = "_mainaccount@" + DOMAIN;
 // const EMAIL_ADDRESS = "olsonm13@" + DOMAIN;
  const EMAIL_PASSWORD = "kvhhZFZFHYG&";

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: EMAIL_SERVER,
    port: 465,
    secure: true,
    auth: {
      user: EMAIL_ADDRESS,
      pass: EMAIL_PASSWORD,
    },
  });

  const email = {
    from: EMAIL_ADDRESS,
    to:EMAIL_ADDRESS,
    subject: 'Contact Submit From Your Website',
    text: message
 };

 transporter.sendMail(email, callback);
}

exports.isValidContactFormSubmit = isValidContactFormSubmit;
exports.sendEmailNotification = sendEmailNotification;