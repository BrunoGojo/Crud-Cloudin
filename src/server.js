const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const db = require('./database/config');

class App {
    constructor() {
        this.express = express();
        this.database();
        this.middlewares();
        this.routes();
        this.createServer();
    }

    database() {
        mongoose.connect(db.uri, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log('Conexão com o banco de dados estabelecida'))
            .catch(err => console.error('Erro ao conectar ao banco de dados:', err));
    }

    middlewares() {
        this.express.use(cors());
        this.express.use(express.json());
        this.express.use(express.static(path.join(__dirname, 'public')));
    }

    routes() {
        this.express.use(require("./routes"));
    }

    createServer() {
        this.express.listen(3001, () => {
            console.log('App rodando na porta 3001');
        });
    }
}

module.exports = new App().express;