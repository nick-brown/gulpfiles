var mongoose   = require('mongoose')
,   Schema     = mongoose.Schema;

var OrderSchema = new Schema({
    name     : { type: String  , required: true },
    street   : { type: String  , required: true },
    state    : { type: String  , required: true },
    zip      : { type: String  , required: true },
    country  : { type: String  , required: true },
    products : { type: Array   , required: true },
    giftwrap : { type: Boolean , default : false },
    created  : { type: Date    , default : Date.now() },
    updated  : { type: Date    , default : Date.now() }
});

module.exports = mongoose.model('Order', OrderSchema);
