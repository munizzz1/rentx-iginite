"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordRoutes = void 0;

var _express = require("express");

var _SendForgotPasswordMailController = require("@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController");

var _ResetPasswordUserController = require("@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController");

const passwordRoutes = (0, _express.Router)();
exports.passwordRoutes = passwordRoutes;
const sendForgotPasswordController = new _SendForgotPasswordMailController.SendForgotPasswordMailController();
const resetPasswordUserController = new _ResetPasswordUserController.ResetPasswordController();
passwordRoutes.post('/forgot', sendForgotPasswordController.handle);
passwordRoutes.post('/reset', resetPasswordUserController.handle);