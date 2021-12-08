"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAvailableCarsController = void 0;

var _tsyringe = require("tsyringe");

var _ListAvailableCarsUseCase = require("./ListAvailableCarsUseCase");

class ListAvailableCarsController {
  async handle(request, response) {
    const {
      category_id,
      brand,
      name
    } = request.query;

    const listAvailableCarsUseCase = _tsyringe.container.resolve(_ListAvailableCarsUseCase.ListAvailableCarsUseCase);

    const cars = await listAvailableCarsUseCase.execute({
      category_id: category_id,
      brand: brand,
      name: name
    });
    return response.json(cars);
  }

}

exports.ListAvailableCarsController = ListAvailableCarsController;