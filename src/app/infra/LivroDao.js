class LivroDao {

    constructor(db) {

        this._db = db;
    }

    lista() {

        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros',
                (erro, resultados) => {
                    if (erro) return reject('não foi possível listar os livros');
                    
                    return resolve(resultados);
                }
            );
        });
    }

    adiciona({titulo, preco, descricao}) {

        return new Promise((resolve, reject) => {
            this._db.run(
                `
                    INSERT INTO livros (
                        titulo,
                        preco,
                        descricao
                    ) values (?,?,?)
                `,
                [
                    titulo,
                    preco,
                    descricao
                ],
                erro => {
                    if (erro) {
                        console.log(erro);
                        return reject('Não foi possível adicionar o livro');
                    }

                    resolve();
                }
            );
        });
    }

    atualiza({id, titulo, preco, descricao}) {

        return new Promise((resolve, reject) => {
            this._db.run(
                `
                    UPDATE livros
                    SET 
                        titulo = ?,
                        preco = ?,
                        descricao = ?
                    WHERE id = ?
                `,
                [
                    titulo,
                    preco,
                    descricao, 
                    id
                ],
                erro => {
                    if (erro) return reject('Não foi possível atualizar o livro');

                    resolve();
                }
            );
        });
    }

    buscaPorId(id) {

        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    SELECT * 
                    FROM livros
                    WHERE id = ?
                `,
                [id],
                (erro, livro) => {
                    if (erro) return reject('Não foi possível encontrar o livro');

                    return resolve(livro);
                }
            );
        });
    }

    remove(id) {

        return new Promise((resolve, reject) => {
            this._db.run(
                `
                    DELETE 
                    FROM livros 
                    WHERE id = ?
                `, 
                [id],
                erro => {
                    if (erro) return reject('Não foi possível remover o livro');

                    resolve();
                }
            );
        });
    }

}

module.exports = LivroDao;