const express = require('express');
const axios = require('axios');
const nanoid = require('nanoid');
const multer = require('multer');
const path = require('path');

const config = require('../config');
const User = require('../models/User');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});
const router = express.Router();

router.post('/', upload.single('avatarImage'), (req, res) => {
    const userData = req.body;

    if (req.file) {
        userData.avatarImage = req.file.filename;
    }

    const user = new User(req.body);

    user.generateToken();

    user.save()
        .then(user => res.send({message: 'User registered!', user}))
        .catch(error => res.status(400).send(error))
});

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if (!user) return res.status(400).send({message: 'Username or Password incorrect!'});

    const isMatch = await user.checkPassword(req.body.password);
    if (!isMatch) return res.status(400).send({message: 'Username or Password incorrect!'});

    user.generateToken();
    await user.save();

    return res.send({message: 'Login successful!', user});
});

router.delete('/sessions', async (req, res) => {
    const token = req.get("Authorization");
    if(!token) return res.send({message: "OK"});

    const user = await User.findOne({token: token});
    if(!user) return res.send({message: 'OK'});

    await user.save();

    return res.send({message: 'OK'});
});

router.post('/facebookLogin', async (req, res) => {
    const inputToken = req.body.accessToken;
    const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;
    const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

    try {
        const response = await axios.get(debugTokenUrl);

        const responseData = response.data;

        if (responseData.data.error) {
            return res.status(500).send({error: 'Token incorrect'});
        }

        if (responseData.data.user_id !== req.body.id) {
            return res.status(500).send({error: 'User is wrong'});
        }

        let user = await User.findOne({facebookId: req.body.id});

        if (!user) {
            user = new User({
                username: (req.body.email ||req.body.name) || req.body.id,
                displayName: req.body.name || 'Anonymous',
                avatar: req.body.picture.data.url,
                password: nanoid(),
                facebookId: req.body.id
            });
        }

        user.generateToken();

        await user.save();

        return res.send({message: 'Login or register successful!', user});
    } catch (e) {
        return res.status(500).send({error: 'Something went wrong'});
    }
});

module.exports = router;

