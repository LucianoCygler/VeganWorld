const genOrderTemplate = (array, monto)=>{
    let i = 1;
    return (
        `<!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Pedido Vegano - Orden Confirmada</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f8f8f8;">
            <div style="width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 5px;">
                <h1 style="font-size: 24px; text-align: center;">VeganWorld's Order</h1>
                <p style="font-size: 18px; color: #333; margin-bottom: 30px;">Thank you for your purchase on our vegan platform. Here are the details of your order:</p>
        
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <thead>
                        <tr>
                            <th style="font-size: 18px; text-align: left;">Product</th>
                            <th style="font-size: 18px; text-align: left;">Quantity</th>
                            <th style="font-size: 18px; text-align: left;">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${array?.map((e)=>{
                            return (`<tr>
                            <td style="font-size: 18px; text-align: left;">${i++}-> ${e.nombre}.</td>
                            <td style="font-size: 18px; text-align: left;">${e.cant}.</td>
                            <td style="font-size: 18px; text-align: left;">$ ${e.precio} (each)</td>
                        </tr>`)
                        })}
                    </tbody>
                </table>
                
                <p style="font-size: 18px; color: #333; margin-bottom: 20px;">The total amount is $ ${monto}</p>
                <p style="font-size: 18px; color: #333; margin-bottom: 20px;">If you have any questions or need assistance, feel free to contact us:</p>
                <p style="font-size: 18px; color: #333; margin-bottom: 20px;">Phone: +34 123 456 789</p>
                <p style="font-size: 18px; color: #333; margin-bottom: 20px;">Email: veganworld36@gmail.com</p>
            </div>
        </body>
        </html>
        `
    );
}

module.exports = genOrderTemplate;