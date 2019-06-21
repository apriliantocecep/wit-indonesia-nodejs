const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const TransactionSchema = mongoose.Schema({
  registration_date: String,
  date_start: String,
  date_end: String,
  customer: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Customer', 
    default: null,
  },
  cars: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Car', 
    default: null,
  }],
}, {
  timestamps: true,
});

// TransactionSchema.plugin(mongoose_delete, { deletedAt : true });

module.exports = mongoose.model('Transaction', TransactionSchema);