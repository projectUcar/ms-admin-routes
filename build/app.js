"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _package = _interopRequireDefault(require("../package.json"));
var _helmet = _interopRequireDefault(require("helmet"));
var _indexRoutes = _interopRequireDefault(require("./routes/index.routes.js"));
var _routeFromUniversityRoutes = _interopRequireDefault(require("./routes/routeFromUniversity.routes.js"));
var _routeToUniversityRoutes = _interopRequireDefault(require("./routes/routeToUniversity.routes.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
app.set('pkg', _package["default"]);
app.use((0, _helmet["default"])());
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.set("json spaces", 4);

//TODO: add endpoints to express
app.use('/api/v1', _indexRoutes["default"]);
app.use('/api/v1/routes-from-university', _routeFromUniversityRoutes["default"]);
app.use('/api/v1/routes-to-university', _routeToUniversityRoutes["default"]);
var _default = exports["default"] = app;