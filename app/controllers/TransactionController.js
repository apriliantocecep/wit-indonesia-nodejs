const Transaction = require('../models/Transaction');
const Car = require('../models/Car');

/**
 * Return all transactions
 */
exports.findAll = (req, res) => {
  Transaction.find().populate('customer').populate({ path: 'cars', model: Car })
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    res.status(500).send({
      message: error.message || 'Error occurred while retrieving data.'
    })
  })
}

/**
 * Get data by id
 */
exports.findOne = (req, res) => {
  Transaction.findById(req.params.id).populate('customer').populate({ path: 'cars', model: Car })
  .then(data => {
    if (!data) {
      return res.status(404).send({
        message: `Data not found with id ${req.params.id}`
      });
    }

    res.send(data);
  })
  .catch(error => {
    if (error.kind === 'ObjectId') {
      return res.status(404).send({
        message: `Data not found with id ${req.params.id}`
      });
    }

    return res.status(500).send({
      message: error.message || 'Error occurred while retrieving data.'
    });
  })
}

/**
 * Create new data
 */
exports.create = (req, res) => {
  // validate request
  if (!req.body.registration_date) {
    return res.status(400).send({
      message: 'The registration date is required'
    });
  }

  const model = new Transaction(req.body);

  model.save()
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    res.status(500).send({
      message: error.message || 'Error occurred while creating data.'
    });
  });
}

/**
 * Update data
 */
exports.update = (req, res) => {
  // validate request
  if (!req.body.registration_date) {
    return res.status(400).send({
      message: 'The registration date is required'
    });
  }

  Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then(data => {
    if (!data) {
      return res.status(404).send({
        message: `Data not found with id ${req.params.id}`
      });
    }

    res.send(data);
  })
  .catch(error => {
    if (error.kind === 'ObjectId') {
      return res.status(404).send({
        message: `Data not found with id ${req.params.id}`
      });
    }

    return res.status(500).send({
      message: error.message || 'Error occurred while updating data.'
    });
  })
}

/**
 * Delete
 */
exports.delete = (req, res) => {
  Transaction.findById(req.params.id)
  .then(data => {
    if (!data) {
      return res.status(404).send({
        message: `Data not found with id ${req.params.id}`
      });
    }

    data.delete();

    res.send({
      message: 'Data deleted'
    });
  })
  .catch(error => {
    if (error.kind === 'ObjectId') {
      return res.status(404).send({
        message: `Data not found with id ${req.params.id}`
      });
    }

    return res.status(500).send({
      message: error.message || 'Error occurred while retrieving data.'
    });
  })
}
