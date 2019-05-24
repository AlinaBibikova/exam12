const mongoose = require('mongoose');
const config = require('./config');

const User = require('./models/User');
const nanoid = require("nanoid");

const run = async () => {
    await mongoose.connect(config.dbUrl, config.mongoOptions);

    const connection = mongoose.connection;

    const collections = await connection.db.collections();

    for (let collection of collections) {
        await collection.drop();
    }

    await User.create({
            avatar: 'avatar.png',
            username: 'user',
            password: '123',
            displayName: 'Don Joe',
            role: 'user',
            token: nanoid()

        },
        {
            avatar: 'avatar.png',
            username: 'admin',
            password: '123',
            displayName: 'Jack Dan',
            role: 'admin',
            token: nanoid()
        });

    await connection.close();
};

run().catch(error => {
    console.error('Something went wrong', error);
});