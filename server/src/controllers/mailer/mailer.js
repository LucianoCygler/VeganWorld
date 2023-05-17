require("dotenv").config();
const nodemailer = require ('nodemailer');

const {API_PASSWORD} = process.env;


const mailer = (email, name, textContainer)=>{
    const config = {
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'veganworld36@gmail.com', // generated ethereal user
        pass: API_PASSWORD, // generated ethereal password
      }
    };
    
    const message = {
      from: 'veganworld36@gmail.com',
      to: 'veganworld36@gmail.com',
      subject: 'Contact from '+name+'. '+email+'.',
      text: 'The message of '+name+' is: '+textContainer+'. From: '+email,
    }
    
    const transporter = nodemailer.createTransport(config);
    const info = transporter.sendMail(message);
}
  module.exports = mailer;