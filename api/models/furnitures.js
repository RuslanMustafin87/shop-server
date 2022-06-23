const mongoose = require('mongoose');

const furnituresSchema = mongoose.Schema({
    furniture: {
        type: String,
        required: true
    },
});

mongoose.model('furnitures', furnituresSchema);

// let F = mongoose.model('furnitures');

// new F({
//     furniture: 'sofa'
// }).save()

// new F({
//     furniture: 'dresser'
// }).save()

// new F({
//     furniture: 'table'
// }).save()

// new F({
//     furniture: 'wardrobe'
// }).save()