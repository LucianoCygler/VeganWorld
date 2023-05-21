require("dotenv").config();
const nodemailer = require ('nodemailer');

const {API_PASSWORD} = process.env;


const mailerContactUs = (email, name, textContainer)=>{
    const config = {
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'veganworld36@gmail.com', // generated ethereal user
        pass: API_PASSWORD, // generated ethereal password
      }
    };
    if (email && name && textContainer){
      const htmlContent = ` <div>
      <h2>${name} has reach us.</h2>
      <h3>From: ${email}.</h3>
      <h3>The message is the following: </h3>
      <h4>${textContainer}.</h4>
      </div>
      `;
    
    const message = {
      from: 'veganworld36@gmail.com',
      to: 'veganworld36@gmail.com',
      subject: `Contact made by ${name}. From ${email}.`,
      html: htmlContent,
      
    }
    const transporter = nodemailer.createTransport(config);
    const info = transporter.sendMail(message); 
    return info;
  }else throw new Error(`Some inputs are missing.`);
}
  module.exports = mailerContactUs;