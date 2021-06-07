const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        console.log('Base de datos online');
        
    } catch(error) {
        console.log(error)
        throw new Error('Error al iniciar la base de datos');
    }

}

module.exports = {
    dbConnection
}



// PORT
process.env.PORT = process.env.PORT || 3000;

// ENVIRONMENT
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// TOKEN EXPIRATION
// 60s * 60m * 24h * 30d
process.env.TOKEN_EXPIRATION = 60 * 60 * 24 * 30;

// AUTHENTICATION SEED
process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo';

// DATABASE
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb+srv://admin:adminEconomato123456@cluster0.agk4t.mongodb.net/economato?retryWrites=true&w=majority';
} else {
    urlDB = 'mongodb+srv://admin:adminEconomato123456@cluster0.agk4t.mongodb.net/economato?retryWrites=true&w=majority';
}

process.env.URLDB = urlDB;