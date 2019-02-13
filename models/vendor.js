const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Vendor Schema
const VendorSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    vendorname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    workingHours:{
        type:Number
    },
    capacity:{
        type:Number
    }
});

const Vendor = module.exports = mongoose.model('Vendor', VendorSchema);

module.exports.getVendorById = function(id, callback){
    Vendor.findById(id, callback);
}

module.exports.getVendorByVendorname = function(Vendorname, callback){
    const query = {Vendorname: Vendorname}
    Vendor.findOne(query, callback);
}

module.exports.addVendor = function(newVendor, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newVendor.password, salt, (err, hash) => {
            if(err) throw err;
            newVendor.password = hash;
            newVendor.save(callback);
        });
    });
}