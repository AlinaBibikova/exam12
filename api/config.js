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
        appId: '452221312015678',
        appSecret: '5d9a79493374d4c91ffcc77e9247bd8e'
    }
};