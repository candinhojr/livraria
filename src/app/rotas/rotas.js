const { check, validationResult } = require('express-validator/check');

const db = require('../../config/database');
const LivroDao = require('../infra/LivroDao');

module.exports = (app) => {

    app.get('/', (req, resp) => {

        resp.marko(
            require('../views/base/home/home.marko')
        );
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

        resp.marko(
            require('../views/livros/form/form.marko'), { livro: {} });
    });

    app.get('/livros/form/:id', (req, resp) => {

        const { id } = req.params;
        const livroDao = new LivroDao(db);

        livroDao.buscaPorId(id)
            .then(livro => 
                resp.marko(
                    require('../views/livros/form/form.marko'),
                    { livro: livro }
                )
            )
            .catch(erro => console.log(erro));
    });

    app.post('/livros', [
        check('titulo').isLength({ min: 5 }).withMessage('O título precisa ter no mínimo 5 caracteres'),
        check('preco').isCurrency().withMessage('O preço precisa ter um valor monetário válido')
    ], (req, resp) => {
        console.log(req.body);
        const livroDao = new LivroDao(db);

        const erros = validationResult(req);

        if(!erros.isEmpty()) {
            return resp.marko(
                require('../views/livros/form/form.marko'),
                { 
                    livro: req.body,
                    errosValidacao: erros.array()
                }
            );  
        }

        livroDao.adiciona(req.body)
            .then(resp.redirect('/livros'))
            .catch(erro => console.log(erro));
    });

    app.put('/livros', (req, resp) => {

        console.log(req.body);
        const livroDao = new LivroDao(db);

        livroDao.atualiza(req.body)
            .then(resp.redirect('/livros'))
            .catch(erro => console.log(erro));
    });

    app.delete('/livros/:id', (req, resp) => {

        const { id } = req.params;
        const livroDao = new LivroDao(db);

        livroDao.remove(id)
            .then(() => resp.status(200).end())
            .catch(erro => console.log(erro));
    });
};