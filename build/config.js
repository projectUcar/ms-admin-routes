"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VEHICLE_BY_ID_URL = exports.USER_SERVICE_URL = exports.USERNAME_RABBITMQ = exports.SECRET_KEY = exports.QUEUE = exports.PORT_RABBIT = exports.PORT = exports.PASSWORD_RABBITMQ = exports.MONGODB_URI = exports.HOSTNAME_RABBITMQ = exports.AUTH_MS_URL = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var SECRET_KEY = exports.SECRET_KEY = process.env.SECRET;
var MONGODB_URI = exports.MONGODB_URI = process.env.MONGODB_URI;
var PORT = exports.PORT = process.env.PORT || 3000;
var AUTH_MS_URL = exports.AUTH_MS_URL = process.env.AUTH_MS_URL;
var USER_SERVICE_URL = exports.USER_SERVICE_URL = process.env.USER_SERVICE_URL;
var VEHICLE_BY_ID_URL = exports.VEHICLE_BY_ID_URL = process.env.VEHICLE_BY_ID_URL;
var PORT_RABBIT = exports.PORT_RABBIT = process.env.PORT_RABBIT;
var USERNAME_RABBITMQ = exports.USERNAME_RABBITMQ = process.env.USERNAME_RABBITMQ;
var PASSWORD_RABBITMQ = exports.PASSWORD_RABBITMQ = process.env.PASSWORD_RABBITMQ;
var HOSTNAME_RABBITMQ = exports.HOSTNAME_RABBITMQ = process.env.HOSTNAME_RABBITMQ;
var QUEUE = exports.QUEUE = process.env.QUEUE;