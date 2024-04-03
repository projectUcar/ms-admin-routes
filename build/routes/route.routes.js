"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _route = require("../controllers/route.controller");
var _authMiddleware = require("../middleware/authMiddleware");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();

// Rutas protegidas por autenticación
router.post('/create-route', _authMiddleware.authenticateUser, _route.createRoute);
router.get('/get-routes', _authMiddleware.authenticateUser, _route.getRoutes);
var _default = exports["default"] = router;