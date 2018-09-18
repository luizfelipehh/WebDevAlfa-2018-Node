const {sequelize, Usuario} = require('../models');
const {generateToken} = require("../utils/token");

function cadastro(request, response, next) {

    Usuario.create(request.body)
            .then(result => response.status(200).json(result))
            .catch(err => response.status(412).send('Erro ao cadastrar usuário'));

}

function BuscaPorId(request, response, next) {
    Usuario.findOne({where: request.params})
            .then(result => response.status(200).json(result))
            .catch(err => response.status(412).send('Usuário não encontrado!'));
}

function edicao(request, response, next) {
    Usuario.update(request.body, {where: request.params})
            .then(result => response.status(200).json(result))
            .catch(err => response.status(412).send('Erro ao editar Usuário!'));
}

function login(request, response, next) {

    const {body} = request;
    const {email, senha} = body;

    Usuario.findOne({
        where: {
            email: email,
            senha: senha
        }
    })
            .then(result => {

                if (!result) {
                    response.status(412).send('Usuário ou Senha incorreta');
                } else {                    
                    const params = {
                        nome: result.dataValues.nome,
                        email: result.dataValues.email
                    };
                    
                    const token = generateToken(params);
                    response.status(200).json({
                        token: token
                    });
                }

            });
}

function getAll(request, response, next) { //recupera todos
    Usuario.findAll({})
            .then(result => response.status(200).json(result))
            .catch(err => response.status(412).send('Usuário não encontrado'));
}

module.exports = {
    cadastro,
    buscaPorId,
    edicao,
    login,
    getAll
};