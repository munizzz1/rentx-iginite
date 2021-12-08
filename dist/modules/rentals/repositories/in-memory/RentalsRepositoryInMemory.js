"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RentalsRepositoryInMemory = void 0;

var _Rental = require("@modules/rentals/infra/typeorm/entities/Rental");

class RentalsRepositoryInMemory {
  constructor() {
    this.rentals = [];
  }

  async create({
    user_id,
    car_id,
    expected_return_date
  }) {
    const rental = new _Rental.Rental();
    Object.assign(rental, {
      user_id,
      car_id,
      expected_return_date,
      start_date: new Date()
    });
    this.rentals.push(rental);
    return rental;
  }

  async findOpenRentalByCar(car_id) {
    const rental = this.rentals.find(rental => rental.car_id === car_id && !rental.end_date);
    return rental;
  }

  async findOpenRentalByUser(user_id) {
    const rental = this.rentals.find(rental => rental.user_id === user_id && !rental.end_date);
    return rental;
  }

  async findById(id) {
    const rental = this.rentals.find(rental => rental.id === id);
    return rental;
  }

  async findByUser(user_id) {
    const rental = this.rentals.filter(rental => rental.user_id === user_id);
    return rental;
  }

}

exports.RentalsRepositoryInMemory = RentalsRepositoryInMemory;