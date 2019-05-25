const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GallerySchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
    },

    title: {
        type: String, required: true
    },

    image: {
        type: String, required: true
    },
});

const Gallery = mongoose.model('Gallery', GallerySchema);

module.exports = Gallery;