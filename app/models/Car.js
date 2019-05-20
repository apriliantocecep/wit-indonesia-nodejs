const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const CarsSchema = mongoose.Schema({
  brand: String,
  model: String,
  year: String,
  color: String,
  mileage: String,
  engine: String,
  power: String,
  registration_date: String,
  price: String,
  garage: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Garage', 
    default: null,
    unique: true,
    index: true,
  },
}, {
  timestamps: true,
});

CarsSchema.plugin(mongoose_delete, { deletedAt : true });

module.exports = mongoose.model('Cars', CarsSchema);