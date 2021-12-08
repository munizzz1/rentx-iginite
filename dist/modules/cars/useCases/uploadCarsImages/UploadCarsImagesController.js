"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadCarsImagesController = void 0;

var _tsyringe = require("tsyringe");

var _UploadCarsImagesUseCase = require("./UploadCarsImagesUseCase");

class UploadCarsImagesController {
  async handle(request, response) {
    const {
      id
    } = request.params;
    const images = request.files;
    const images_name = images.map(file => file.filename);

    const uploadCarsImagesUseCase = _tsyringe.container.resolve(_UploadCarsImagesUseCase.UploadCarsImagesUseCase);

    await uploadCarsImagesUseCase.execute({
      car_id: id,
      images_name
    });
    return response.status(201).send();
  }

}

exports.UploadCarsImagesController = UploadCarsImagesController;