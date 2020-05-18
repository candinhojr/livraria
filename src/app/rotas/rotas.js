const db = require('../../config/database');
const LivroDao = require('../infra/LivroDao');

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

        const livroDao = new LivroDao(db); // Criar a instância da classe LivroDao.
        livroDao.lista()
            .then(livros => resp.marko(
                require('../views/livros/lista/lista.marko'),
                {
                    livros: livros
                }
            ))
            .catch(erro => console.log(erro));
    });

    app.get('/livros/form', (req, resp) => {
        resp.marko(require('../views/livros/form/form.marko'));
    });

    app.post('/livros', (req, resp) => {
        console.log(req.body);
        const livroDao = new LivroDao(db); // Criar a instância da classe LivroDao.
        livroDao.adiciona(req.body)
            .then(resp.redirect('/livros'))
            .catch(erro => console.log(erro));
    });
};