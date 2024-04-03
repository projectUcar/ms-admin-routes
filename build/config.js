"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VEHICLE_BY_ID_URL = exports.USER_SERVICE_URL = exports.SECRET_KEY = exports.PORT = exports.MONGODB_URI = exports.AUTH_MS_URL = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var SECRET_KEY = exports.SECRET_KEY = process.env.SECRET;
var MONGODB_URI = exports.MONGODB_URI = process.env.MONGODB_URI;
var PORT = exports.PORT = process.env.PORT || 3000;
var AUTH_MS_URL = exports.AUTH_MS_URL = process.env.AUTH_MS_URL;
var USER_SERVICE_URL = exports.USER_SERVICE_URL = process.env.USER_SERVICE_URL;
var VEHICLE_BY_ID_URL = exports.VEHICLE_BY_ID_URL = process.env.VEHICLE_BY_ID_URL;