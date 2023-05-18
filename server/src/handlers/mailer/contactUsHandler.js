const mailer = require('../../controllers/mailer/mailer');

const contactUsHandler = async (req, res)=>{
    const {email, name, textContainer} = req.body;
    try {
        if (email && name && textContainer){
            await mailer(email, name, textContainer);
            res.status(200).send('Mail sent correctly.');
        }else{
            return res.status(400).send("Faltan datos para crear el pedido");
        }
    } catch (error) {
        res.status(500).send(`${error.message}`);
    }
}

module.exports = contactUsHandler;