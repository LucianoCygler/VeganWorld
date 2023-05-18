require("dotenv").config();
const {Product} = require('../../models/Product');
const nodemailer = require ('nodemailer');
const getOneProduct = require("../product/getOneProduct");

const {API_PASSWORD} = process.env;


const mailerGenOrder = async (order, user)=>{
    const {cliente_id, importe, productos} = order;
    if (!user){
        throw new Error(`Client with id ${cliente_id} hasn't been found`);
    }else{
        let counter = 1;
        const productsNames = await Promise.all(
            productos.map(async (element) => {
              const productDB = await getOneProduct(element);
              return productDB.nombre;
            })
          );
        const htmlContent = `<div>
        <h2>The order has been created sucessfully.</h2>
        <h2>Thank you ${user.nombre} for your purchase. Make sure to review your products once you ate them.</h2>
        <h3>The amount is $${importe}.</h3>
        <h3>Here is a list of your items:</h3>
        ${productsNames?.map( (element)=>{
                return (`<h4>${counter++}: ${element}.</h4>`);
            })
        }

    </div>`;
        
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
        to: user.email,
        subject: `Thank you for your order. ${user.nombre}.`,
        html: htmlContent,
    }
        
    const transporter = nodemailer.createTransport(config);
    const info = await transporter.sendMail(message);
    return info;
    }
}


module.exports = mailerGenOrder;