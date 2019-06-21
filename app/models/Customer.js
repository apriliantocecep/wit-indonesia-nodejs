const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const CustomerSchema = mongoose.Schema({
  name: String,
  phone: String,
  address: String,
}, {
  timestamps: true,
});

// CustomerSchema.plugin(mongoose_delete, { deletedAt : true });

module.exports = mongoose.model('Customer', CustomerSchema);