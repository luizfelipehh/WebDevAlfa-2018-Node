const express = require('express');
const router = express.Router();

const {authenticationMiddleware} = require('../utils/token');
const validateSchema = require('./validateSchema');
const controller = require('../controllers/tarefas');

router.get('/',
        authenticationMiddleware,
        (request, response) => {
    controller.listagem(request, response);
});

router.get('/:id',
        authenticationMiddleware,
        (request, response) => {
    controller.buscaPorId(request, response);
});

router.post('/',
        authenticationMiddleware,
        (request, response) => {
    controller.cadastro(request, response);
});

router.put('/:id/:acao?',
        authenticationMiddleware,
        (request, response) => {
    params = request.params;
    const {acao} = params;

    if (acao === 'concluida') {
        controller.marcarConcluida(request, response);
    } else {
        controller.edicao(request, response);
    }
});

router.delete('/:id/:acao?',
        authenticationMiddleware,
        (request, response) => {

    params = request.params;
    const {acao} = params;

    if (acao === 'concluida') {
        controller.desmarcaConcluida(request, response);
    } else {
        controller.deletar(request, response);
    }
});

module.exports = router;