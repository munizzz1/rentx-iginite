"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.carsRoutes = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("@config/upload"));

var _CreateCarController = require("@modules/cars/useCases/createCar/CreateCarController");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

var _ensureAdmin = require("../middlewares/ensureAdmin");

var _ListAvailableCarsController = require("@modules/cars/useCases/listAvailableCars/ListAvailableCarsController");

var _CreateCarSpecificationController = require("@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController");

var _UploadCarsImagesController = require("@modules/cars/useCases/uploadCarsImages/UploadCarsImagesController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const carsRoutes = (0, _express.Router)();
exports.carsRoutes = carsRoutes;
const upload = (0, _multer.default)(_upload.default);
const createCarController = new _CreateCarController.CreateCarController();
const listAvailableCarsController = new _ListAvailableCarsController.ListAvailableCarsController();
const createCarSpecificationController = new _CreateCarSpecificationController.CreateCarSpecificationController();
const uploadCarsImagesController = new _UploadCarsImagesController.UploadCarsImagesController();
carsRoutes.post('/', _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createCarController.handle);
carsRoutes.post('/specifications/:id', _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createCarSpecificationController.handle);
carsRoutes.post('/images/:id', _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, upload.array('images'), uploadCarsImagesController.handle);
carsRoutes.get('/available', listAvailableCarsController.handle);