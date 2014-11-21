var mongoose   = require('mongoose')
,   Schema     = mongoose.Schema;

var ProductSchema = new Schema({
    name: String,
    description: { type: Boolean, default: "" },
    category: { type: Boolean, default: "" },
    price: { type: Number, default: 0.00 },
    created: { type: Date, default: Date.now() },
    updated: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Product', ProductSchema);
