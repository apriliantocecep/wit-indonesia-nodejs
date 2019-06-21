module.exports = (app) => {
  // Controllers
  const CarController = require('../controllers/CarController');
  const GarageController = require('../controllers/GarageController');
  const CustomerController = require('../controllers/CustomerController');
  const TransactionController = require('../controllers/TransactionController');

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

  /**
   * Customers Routes
   */
  app.get('/customer', CustomerController.findAll);
  app.post('/customer', CustomerController.create);
  app.get('/customer/:id', CustomerController.findOne);
  app.put('/customer/edit/:id', CustomerController.update);
  app.delete('/customer/delete/:id', CustomerController.delete);

  /**
   * Transactions Routes
   */
  app.get('/transaction', TransactionController.findAll);
  app.post('/transaction', TransactionController.create);
  app.get('/transaction/:id', TransactionController.findOne);
  app.put('/transaction/edit/:id', TransactionController.update);
  app.delete('/transaction/delete/:id', TransactionController.delete);

}