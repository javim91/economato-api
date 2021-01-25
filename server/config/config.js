// PORT
process.env.PORT = process.env.PORT || 3000;

// ENVIRONMENT
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// DATABASE
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb+srv://admin:adminEconomato123456@cluster0.agk4t.mongodb.net/economato?retryWrites=true&w=majority';
} else {
    urlDB = 'mongodb+srv://admin:adminEconomato123456@cluster0.agk4t.mongodb.net/economato?retryWrites=true&w=majority';
}

process.env.URLDB = urlDB;