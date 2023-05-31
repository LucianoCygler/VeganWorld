const registerTemplate = require('../../utils/mailTemplates/registerTemplate');
require("dotenv").config();
const nodemailer = require ('nodemailer');

const {API_PASSWORD} = process.env;

const mailerRegister = async ({nombre, direccion, email})=>{
    if (!nombre || !direccion || !email){
        throw new Error(`Client with id ${cliente_id} hasn't been found`);
    }else{
        /*const htmlContent = `<div>
            <h1>Thank you for singing up ${user.nombre}.</h1>
            <h2>Now you can start to make your orders and enjoy our meals.</h2>
            <h3>See you soon.</h3>
            <h3>Vegan World Staff.</h3>

        </div>`;
        */
        const htmlContent= registerTemplate({nombre, direccion, email});
    const config = {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: 'veganworld36@gmail.com',
            pass: API_PASSWORD,
        }
    };
    
    const message = {
        from: 'veganworld36@gmail.com',
        to: email,
        subject: `Thank you for singing up. ${nombre}.`,
        html: htmlContent,
    }
        
    const transporter = nodemailer.createTransport(config);
    const info = await transporter.sendMail(message);
    return info;
    }
}

module.exports = mailerRegister;