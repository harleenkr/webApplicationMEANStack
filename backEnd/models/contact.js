const mongoose = require('mongoose');

var Contact = mongoose.model('Contact', {
    name: { type: String },
    email: { type: String },
    phoneNo: { type: Number }
});

module.exports = { Contact };