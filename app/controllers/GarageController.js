const Garage = require('../models/Garage');

/**
 * Return all garages
 */
exports.findAll = (req, res) => {
  Garage.find()
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
 * Create new data
 */
exports.create = (req, res) => {
  // validate request
  if (!req.body.name) {
    return res.status(400).send({
      message: 'The name is required'
    });
  }

  const model = new Garage({
    name: req.body.name,
    address: req.body.address || null,
    phone: req.body.phone || null,
    email: req.body.email || null,
    max_cars: req.body.max_cars || null,
  });

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
 * Get data by id
 */
exports.findOne = (req, res) => {
  Garage.findById(req.params.id)
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
 * Update data
 */
exports.update = (req, res) => {
  // validate request
  if (!req.body.name) {
    return res.status(400).send({
      message: 'The name is required'
    });
  }

  Garage.findByIdAndUpdate(req.params.id, req.body, { new: true })
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
 * Soft Delete
 */
exports.delete = (req, res) => {
  Garage.findById(req.params.id)
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