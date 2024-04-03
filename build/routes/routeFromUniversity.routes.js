"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _routeFromUniversity = require("../controllers/routeFromUniversity.controller");
var _authMiddleware = require("../middleware/authMiddleware");
var router = (0, _express.Router)();

// Rutas protegidas por autenticación
router.post('/create-route', _authMiddleware.authenticateUser, _routeFromUniversity.createRoute);
router.get('/get-routes', _authMiddleware.authenticateUser, _routeFromUniversity.getAllRoutes);
router.get('/city/:cityName', _authMiddleware.authenticateUser, _routeFromUniversity.findRoutesByCity);
router.get('/properties', _authMiddleware.authenticateUser, _routeFromUniversity.getRoutePropertiesFromUniversity);
var _default = exports["default"] = router;