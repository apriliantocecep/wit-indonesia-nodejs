const Car = require('../models/Car');

/**
 * Return all cars
 */
exports.findAll = (req, res) => {
  Car.find().populate('garage')
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
  Car.findById(req.params.id).populate('garage')
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
  if (!req.body.brand) {
    return res.status(400).send({
      message: 'The brand is required'
    });
  }

  const model = new Car(req.body);

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
  if (!req.body.brand) {
    return res.status(400).send({
      message: 'The brand is required'
    });
  }

  Car.findByIdAndUpdate(req.params.id, req.body, { new: true })
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
 * Save car to garage
 */
exports.park = (req, res) => {
  var car_id = req.body.car_id;
  var garage_id = req.body.garage_id;

  // validate request
  if (!car_id) {
    return res.status(400).send({
      message: 'The car id is required'
    });
  }

  if (!garage_id) {
    return res.status(400).send({
      message: 'The garage id is required'
    });
  }

  Car.findByIdAndUpdate(car_id, {
    garage: garage_id
  }, { new: true, runValidators: true })
  .then(data => {
    if (!data) {
      return res.status(404).send({
        message: `Data not found with id ${car_id}`
      });
    }

    res.send(data);
  })
  .catch(error => {
    // if (error.kind === 'ObjectId') {
    //   return res.status(404).send({
    //     message: `Data not found with id ${car_id}`
    //   });
    // }

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
  Car.findById(req.params.id)
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