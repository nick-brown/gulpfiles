var mongoose   = require('mongoose')
,   Schema     = mongoose.Schema;

var OrderSchema = new Schema({
    name     : String,
    street   : String,
    state    : String,
    zip      : String,
    country  : String,
    giftwrap : { type: Boolean, default: false },
    products : Array,
    created  : { type: Date, default: Date.now() },
    updated  : { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Order', OrderSchema);
