const mailerContactUs = require('../../controllers/mailer/contactUs');
const mailerGenOrder = require('../../controllers/mailer/generateOrder');
const mailerRegister = require('../../controllers/mailer/register');


const mailerHandler = async (req, res)=>{
    const {type} = req.body;
    switch (type){
        case 'genOrder': {
            const {user, order} = req.body;
            try {
                
                if (order?.cliente_id && order?.productos){
                    const info= await mailerGenOrder(order, user);
                    if (!info) throw new Error(`Mail couldn't be sent correctly.`);
                    res.status(200).send('E-mail sent correctly.');
                }else res.status(400).send('Some inputs are missing.');
            } catch (error) {
                res.status(500).send(error.message);
            }
        }
        break;

        case 'register': 
            const {nombre, direccion, email} = req.body;
            try {
                if (nombre && direccion && email){
                    const info = await mailerRegister({nombre, direccion, email});
                    if (!info) throw new Error(`Mail couldn't be sent correctly.`);
                    res.status(200).send(`E-mail sent correctly.`);
                }else res.status(400).send('Some inputs are missing.');
            } catch (error) {
                res.status(500).send(error.message)
            }
        break;
        default: {
            const {email, name, textContainer} = req.body;
            try {
                if (email && name && textContainer){
                    mailerContactUs(email, name, textContainer);
                    res.status(200).send('E-mail sent correctly.');
                }else res.status(400).send('Some inputs are missing.');
            } catch (error) {
                res.status(500).send(error.message);
            }
        }
    }
    
    
    
}

module.exports = mailerHandler;