module.exports = (app) => {

    app.get('/', (req, resp) => {

        resp.send(`
            <html>
                <head>
                    <meta charset='utf-8'>
                </head>
                <body>
                    <h1>Livraria do tio Candinho</h1>
                </body>
            </html>
        `);
    });

    app.get('/livros', (req, resp) => {

        resp.send(`
            <html>
                <head>
                    <meta charset='utf-8'>
                </head>
                <body>
                    <h1>Listagem de livros do tio Candinho</h1>
                </body>
            </html>
        `);
    });
};