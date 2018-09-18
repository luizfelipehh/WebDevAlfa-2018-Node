const Sequelize = require('sequelize');

const sequelize = new Sequelize(null, null, null, {
    dialect: 'sqlite',
    storage: './database.sqlite',
    define: {
        timestamps: true,
        freezeTableName: true,
    }
});

const Usuario = sequelize.define('usuario', {
    nome: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    senha: Sequelize.STRING,
    cpf: Sequelize.BIGINT,
    nascimento: Sequelize.DATE
});

const Tarefa = sequelize.define('tarefa', {
    titulo: Sequelize.STRING,
    descricao: Sequelize.TEXT,
    concluida: {
        type: Sequelize.INTEGER,
        isNullable: true
    }
});

Usuario.hasMany(Tarefa, {
    foreignKey: 'usuarioId',
    isNullable: true
});

module.exports = {
    sequelize,
    Usuario,
    Tarefa
};