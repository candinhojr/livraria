const LivroControlador = require('../controladores/LivroControlador');
const livroControlador = new LivroControlador();

const BaseControlador = require('../controladores/BaseControlador');
const baseControlador = new BaseControlador();

const Livro = require('../modelos/livro');

module.exports = (app) => {
    const rotasBase = BaseControlador.rotas();
    const rotasLivro = LivroControlador.rotas();

    app.get(rotasBase.home, baseControlador.home());

    app.get(rotasLivro.lista, livroControlador.lista());

    app.get(rotasLivro.cadastro, livroControlador.formularioCadastro());

    app.get(rotasLivro.edicao, livroControlador.formularioEdicao());

    app.post(rotasLivro.lista, Livro.validacoes(), livroControlador.cadastra());

    app.put(rotasLivro.lista, livroControlador.edita());

    app.delete(rotasLivro.delecao, livroControlador.remove());
    
    app.get(rotasLivro.delecao, livroControlador.detalha());
};