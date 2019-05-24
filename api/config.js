const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    dbUrl: 'mongodb://localhost/exam12',
    mongoOptions: {
        useNewUrlParser: true,
        useCreateIndex: true,
    },
    facebook: {
        appId: '545138079223618',
        appSecret: '739a3bb638b68d5d77acd655a8248dbd'
    }
};