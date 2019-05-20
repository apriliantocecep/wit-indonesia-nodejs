const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const GaragesSchema = mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  email: String,
  max_cars: String,
}, {
  timestamps: true,
});

GaragesSchema.plugin(mongoose_delete, { deletedAt : true });
// uncomment this if use ovveriding method from package mongoose_delete
// GaragesSchema.plugin(mongoose_delete, { deletedAt : true, overrideMethods: true });

module.exports = mongoose.model('Garage', GaragesSchema);