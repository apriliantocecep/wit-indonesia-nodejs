module.exports = (app) => {
  // Controllers
  const CarController = require('../controllers/CarController');
  const GarageController = require('../controllers/GarageController');

  /**
   * Route Index
   */
  app.get('/', (req, res) => {
    res.json({"message": "Welcome to the WIT Test API"});
  });

  /**
   * Cars Routes
   */
  app.get('/car', CarController.findAll);
  app.post('/car', CarController.create);
  app.get('/car/:id', CarController.findOne);
  app.put('/car/edit/:id', CarController.update);
  app.put('/car/park', CarController.park);
  app.delete('/car/delete/:id', CarController.delete);

  /**
   * Garages Routes
   */
  app.get('/garage', GarageController.findAll);
  app.post('/garage', GarageController.create);
  app.get('/garage/:id', GarageController.findOne);
  app.put('/garage/edit/:id', GarageController.update);
  app.delete('/garage/delete/:id', GarageController.delete);

}