const express = require('express')
const cors = require('cors')

const { dbConnection } = require('../database/config')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersRoutesPath = '/api/users';

        // DB Connection
        this.connectDB();

        // Middlewares
        this.middlewares();

        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());    
        // Lectura y parseo del body
        this.app.use(express.json());    
        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usersRoutesPath, require('../routes/users'));
    }

    listen() {   
        this.app.listen(this.port, () => {
            console.log('Escuchando puerto: ', this.port);
        });
    }

}

module.exports=Server;