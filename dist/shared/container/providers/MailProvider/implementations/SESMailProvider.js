"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SESMailProvider = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _awsSdk = require("aws-sdk");

var _handlebars = _interopRequireDefault(require("handlebars"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SESMailProvider {
  constructor() {
    this.client = void 0;
    this.client = _nodemailer.default.createTransport({
      SES: new _awsSdk.SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_REGION
      })
    });
  }

  async sendMail(to, subject, variables, path) {
    const templateFileContent = _fs.default.readFileSync(path).toString('utf-8'); //Pegar arquivo de templante puro


    const templateParse = _handlebars.default.compile(templateFileContent); // Utilizando o handlebars para fazer o parse do template


    const templanteHTML = templateParse(variables); // Passando a variables do template

    await this.client.sendMail({
      to,
      from: 'Rentx <jhonatanmuniz@deve.com>',
      subject,
      html: templanteHTML
    });
  }

}

exports.SESMailProvider = SESMailProvider;