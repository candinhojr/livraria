const templates = require('../views/templates');

class BaseControlador {

    static rotas() {

        return {
            home: '/',
            login: '/login'
        };
    }

    home() {
        
        return (req, resp) => {

            resp.marko(
                templates.base.home
            );
        };
    }

    login() {
        
        return (req, resp) => {

            resp.marko(templates.base.login);
        };
    }

    efetuarLogin() {
        
        return (req, resp) => {

        };
    }
}

module.exports = BaseControlador;