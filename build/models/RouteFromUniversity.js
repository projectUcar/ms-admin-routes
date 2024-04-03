"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var routeFromUniversitySchema = new _mongoose["default"].Schema({
  origin: {
    type: String,
    "default": 'Universidad Pontificia Bolivariana'
  },
  destination: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  departureDate: {
    type: Date,
    required: true
  },
  departureTime: {
    type: String,
    required: true
  },
  availableSeats: {
    type: Number,
    required: true,
    min: 1
  },
  vehicleId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  driverUserId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  },
  passengers: [{
    user: {
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      "enum": ['pending', 'approved', 'rejected'],
      "default": 'pending'
    }
  }],
  status: {
    type: String,
    "enum": ['created', 'saved', 'closed', 'modified', 'deleted', 'expired'],
    "default": 'created'
  }
}, {
  timestamps: true,
  versionKey: false
});
var RouteFromUniversity = _mongoose["default"].model('RouteFromUniversity', routeFromUniversitySchema);
var _default = exports["default"] = RouteFromUniversity;