const mongoose = require('mongoose');
const config = require('./config');

const User = require('./models/User');
const Gallery = require('./models/Gallery');
const nanoid = require("nanoid");

const run = async () => {
    await mongoose.connect(config.dbUrl, config.mongoOptions);

    const connection = mongoose.connection;

    const collections = await connection.db.collections();

    for (let collection of collections) {
        await collection.drop();
    }

    const [test, user] = await User.create({
            avatarImage: 'avatar.png',
            username: 'user',
            password: '123',
            displayName: 'Don Joe',
            token: nanoid()

        },
        {
            avatarImage: 'avatar.png',
            username: 'test',
            password: '123',
            displayName: 'Jack Dan',
            token: nanoid()
        });

    await Gallery.create(
        {
            user: user._id,
            title: 'Pina colada',
            image: 'colada.jpg',
        },

        {
            user: test._id,
            title: 'Mohito',
            image: 'mohito.jpg',
        },
    );

    await connection.close();
};

run().catch(error => {
    console.error('Something went wrong', error);
});