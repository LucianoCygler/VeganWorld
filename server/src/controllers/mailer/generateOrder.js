require("dotenv").config();
const {Product} = require('../../models/Product');
const nodemailer = require ('nodemailer');
const getOneProduct = require("../product/getOneProduct");
const genOrderTemplate = require("../../utils/mailTemplates/genOrderTemplate");

const {API_PASSWORD} = process.env;


const mailerGenOrder = async (order, user)=>{
    const cleanInfo = (products)=>{
        const newArray = [];
        products.forEach((e)=>{
            if (!!newArray.find((obj)=> obj?.id == e)){
                const index = newArray.findIndex((obj)=> obj?.id == e);
                if (index !== -1){
                    let aux = newArray[index];
                    aux= {...aux, cant: aux.cant+1};
                    newArray[index]= aux;
                }
            }else{
                newArray.push({id: e, cant: 1});
            }
        });
        return newArray;
    }

    const {cliente_id, monto, productos} = order;
    if (!user){
        throw new Error(`Client with id ${cliente_id} hasn't been found`);
    }else{
        const array = cleanInfo(productos);
        const productsNames = await Promise.all(
            array.map( async (element) => {
              const productDB = await getOneProduct(element.id);
              return ({nombre: productDB.nombre, cant: element.cant, precio: productDB.precio});
            })
          );

        const htmlContent = genOrderTemplate(productsNames, monto);
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