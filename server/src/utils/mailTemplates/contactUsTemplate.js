const contactUsTemplate = (name, email, textContainer)=>{
    return (
        `<!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: Arial, sans-serif;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f8f8f8;
              border: 1px solid #ccc;
            }
            .header {
              text-align: center;
              padding: 10px;
            }
            .content {
              margin-top: 10px;
            }
            .contact-info {
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Vegan World</h1>
            </div>
            <div class="content">
              <p>The client ${name} has reached us from ${email}.</p>
              <p>Here is what ${name} says:</p>
              <p>${textContainer}</p>
            </div>
            <div class="contact-info">
              <p>Name: ${name}</p>
              <p>E-mail: ${email}</p>
            </div>
          </div>
        </body>
        </html>`
    );
}

module.exports = contactUsTemplate;