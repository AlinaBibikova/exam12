const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const path = require('path');
const config = require('../config');

const auth = require('../middleware/auth');
const Gallery = require('../models/Gallery');

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

router.get('/', async (req, res) => {
    try {
        const galleries = await Gallery.find().populate('user');
        return res.send(galleries);
    } catch {
        return res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const gallery = await Gallery.findById(req.params.id).populate('user');

        if (gallery) {
            return res.send(gallery);
        } else {
            return res.status(404).send({message: 'Gallery not found!'});
        }

    } catch {
        return res.status(404).send({message: 'Gallery not found!'});
    }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
    const galleryData = req.body;
    galleryData.user = req.user._id;

    if (req.file) {
        galleryData.image = req.file.filename;
    }

    try {
        const gallery = new Gallery(galleryData);
        await gallery.save();
        return res.send({message: 'Gallery added!', gallery});
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const gallery = await Gallery.findById(req.params.id);
        if (gallery.user.equals(req.user._id)) {
            await gallery.remove();

            return res.status(200).send({message: 'Gallery deleted!'});
        } else {
            return res.status(403).send({message: 'Access forbidden!'});
        }
    } catch (error) {
        return res.status(400).send(error);
    }
});

module.exports = router;

