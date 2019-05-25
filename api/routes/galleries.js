const express = require('express');

const auth = require('../middleware/auth');
const Gallery = require('../models/Gallery');

const router = express.Router();

router.get('/', async (req, res) => {

    try {
        const Gallery = await Gallery
            .select(['title', 'image', 'user']);
        return res.send(Gallery);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const gallery = await Gallery.findById(req.params.id);

        if (gallery) {
            return res.send(gallery);
        } else {
            return res.status(404).send({message: 'Gallery not found!'});
        }

    } catch {
        return res.status(404).send({message: 'Gallery not found!'});
    }
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
    const galleryData = req.body;
    galleryData.user = req.user._id;

    if (req.file) {
        galleryData.image = req.file.filename;
    }

    try {
        const gallery = new Gallery(galleryData);

        await gallery.save();
        return res.send({message: 'Gallery added!', gallery: gallery});
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const gallery = await Gallery.findById(req.params.id);
        console.log(gallery);
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

