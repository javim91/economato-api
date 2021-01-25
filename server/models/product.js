var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var productSchema = new Schema({
    code: { type: Number, required: [true, 'El código del producto es necesario'] },
    name: { type: String, required: [true, 'El nombre del producto es necesario'] },
    price: { type: Number, required: [true, 'El precio unitario es necesario'] },
    unit: { type: String, required: [true, 'La unidad de medida necesaria'] },
    multiply: { type: Number, required: [true, 'La equivalencia por bulto es necesaria'] },
    provider: { type: Schema.Types.ObjectId, ref: 'Provider', required: true },
    center: { type: String, required: true },
});


module.exports = mongoose.model('Product', productSchema);