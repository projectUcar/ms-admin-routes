"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var routeToUvnicersityCtr = _interopRequireWildcard(require("../controllers/routeToUniversity.controller"));
var _authMiddleware = require("../middleware/authMiddleware");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var router = (0, _express.Router)();

// Rutas protegidas por autenticación
router.post('/create-route', _authMiddleware.authenticateUser, routeToUvnicersityCtr.createRoute);
router.get('/get-routes', _authMiddleware.authenticateUser, routeToUvnicersityCtr.getAllRoutes);
router.get('/city/:cityName', _authMiddleware.authenticateUser, routeToUvnicersityCtr.findRoutesByCity);
router.get('/properties', _authMiddleware.authenticateUser, routeToUvnicersityCtr.getRoutePropertiesFromUniversity);
router.get('/id/:routeId', _authMiddleware.authenticateUser, routeToUvnicersityCtr.getRoutesById);
router.get('/my-routes/:driverUserId', _authMiddleware.authenticateUser, routeToUvnicersityCtr.getMyRoutes);
var _default = exports["default"] = router;