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

        resp.marko(
            require('../views/livros/lista/lista.marko'),
            {
                livros: [
                    {
                        id: 1,
                        titulo: 'Fundamendos do Node'
                    },
                    {
                        id: 2,
                        titulo: 'Node avançado'
                    }
                ]
            }
        );
    });
};