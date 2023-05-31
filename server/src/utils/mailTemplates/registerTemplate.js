const registerTemplate = (user)=>{
    return (
        `<!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f8f8f8;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 30px;
          border-radius: 5px;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .header h1 {
          font-size: 24px;
          margin-bottom: 10px;
        }
        .header p {
          font-size: 16px;
        }
        .content {
          text-align: center;
        }
        .content ul {
          list-style-type: none;
          padding: 0;
        }
        .content li {
          font-size: 18px;
          margin-bottom: 10px;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
        }
        .footer p {
          font-size: 14px;
          color: #777777;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Bienvenido a nuestra plataforma vegana de comida</h1>
          <p>Gracias por unirte a nuestra comunidad de amantes de la comida saludable y sostenible.</p>
        </div>
        <div class="content">
          <ul>
            <li>Tu nombre: <span>${user.nombre}</span></li>
            <li>Tu correo electrónico: <span>${user.email}</span></li>
            <li>Tu dirección: <span>${user.direccion}</span></li>
          </ul>
        </div>
        <div class="footer">
          <p>Si tienes alguna pregunta, no dudes en contactarnos. ¡Estamos aquí para ayudarte!</p>
        </div>
      </div>
    </body>
    </html>`
    );
}

module.exports = registerTemplate;