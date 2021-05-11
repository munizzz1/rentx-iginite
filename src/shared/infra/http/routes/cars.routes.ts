import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";

const carsRoutes = Router()

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecification = new CreateCarSpecificationController();

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle);
carsRoutes.post('/specifications/:id', ensureAuthenticated, ensureAdmin, createCarSpecification.handle);
carsRoutes.get('/available', listAvailableCarsController.handle);

export { carsRoutes };