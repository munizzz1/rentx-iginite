"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserController = void 0;

var _tsyringe = require("tsyringe");

var _CreateUserUseCase = require("./CreateUserUseCase");

class CreateUserController {
  async handle(request, response) {
    const {
      name,
      username,
      email,
      driver_license,
      password
    } = request.body;

    const createUserUseCase = _tsyringe.container.resolve(_CreateUserUseCase.CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      email,
      driver_license,
      password
    });
    return response.status(201).send();
  }

}

exports.CreateUserController = CreateUserController;