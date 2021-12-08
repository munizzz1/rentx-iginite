"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationsInMemory = void 0;

var _Specification = require("@modules/cars/infra/typeorm/entities/Specification");

class SpecificationsInMemory {
  constructor() {
    this.specification = [];
  }

  async create({
    name,
    description
  }) {
    const specification = new _Specification.Specification();
    Object.assign(specification, {
      name,
      description
    });
    this.specification.push(specification);
    return specification;
  }

  async findByName(name) {
    const specification = this.specification.find(specification => specification.name === name);
    return specification;
  }

  async findByIds(ids) {
    const specifications = this.specification.filter(specification => ids.includes(specification.id));
    return specifications;
  }

  async list() {
    return this.specification;
  }

}

exports.SpecificationsInMemory = SpecificationsInMemory;