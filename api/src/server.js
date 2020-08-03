const express = require("express");
const db = require("./database/config");
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = 8000;
const HOST = '0.0.0.0';

class App{
    constructor(){
        this.express = express();
        
        this.database();
        this.middlewares();
        this.routes();

        this.express.listen(PORT, HOST);
    }    

    database(){
        mongoose.connect(db.uri, {useNewUrlParser: true});
    }

    middlewares(){
        this.express.use(cors());
        this.express.use(express.json());
    }

    routes(){
        this.express.use(require("./routes"));
    }
}

module.exports = new App().express;