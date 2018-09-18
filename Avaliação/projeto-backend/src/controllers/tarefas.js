const {sequelize, Tarefa} = require('../models');

function cadastro(request, response, next) {
    Tarefa.create(request.body)
            .then(result => response.status(200).json(result))
            .catch(err => response.status(412).send('Erro ao cadastrar Tarefa'));
}

function listagem(request, response, next) {
    const Op = sequelize.Op;
    let titulo = request.query.titulo;
    if (titulo == null) {
        titulo = '';
    }

    Tarefa.findAll({
        where: {
            titulo: {
                [Op.like]: '%' + titulo + '%'
            }
        }
    })
            .then(result => response.status(200).json(result))
            .catch(err => response.status(412).send('Não foi encontrada a tarefa desejada'));
}

function BuscaPorId(request, response, next) {
    Tarefa.findOne({where: request.params})
            .then(result => response.status(200).json(result))
            .catch(err => response.status(412).send('Tarefa não encontrada'));
}

function edicao(request, response, next) {
    Tarefa.update(request.body, {
        where: {
            id: request.params.id
        }
    })
            .then(result => response.status(200).json(result))
            .catch(err => response.status(412).send('Erro ao editar a tarefa'));
}

function remocao(request, response, next) {
    Tarefa.destroy({
        where: {
            id: request.params.id
        }
    })
            .then(result => (
                        Tarefa.findAll({})
                        .then(result => response.status(200).json(result))
                        .catch(err => response.status(412).send('Tarefa não entrada para ser removida!'))
                        ))
            .catch(err => response.status(412).send('Erro ao excluir tarefa'));
}

function marcarConcluida(request, response, next) {
    Tarefa.update(
            {
                concluida: 1
            },
            {
                where: {
                    id: request.params.id
                }
            })
            .then(result => response.status(200).json(result))
            .catch(err => response.status(412).send('Erro para concluír tarefa'));
}

function desmarcarConcluida(request, response, next) {
    Tarefa.update(
            {
                concluida: null
            },
            {
                where: {
                    id: request.params.id
                }
            })
            .then(result => response.status(200).json(result))
            .catch(err => response.status(412).send('Erro ao desmarcar tarefa'));
}

module.exports = {
    cadastro,
    listagem,
    buscaPorId,
    edicao,
    remocao,
    marcarConcluida,
    desmarcarConcluida,
};