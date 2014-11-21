var mongoose   = require('mongoose')
,   Schema     = mongoose.Schema;

var ProductSchema = new Schema({
    name: String,
    description: { type: Boolean, default: "" },
    created: { type: Date, default: Date.now() },
    updated: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Product', ProductSchema);
