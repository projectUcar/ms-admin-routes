"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var routeSchema = new _mongoose["default"].Schema({
  origin: {
    type: String,
    required: true
  },
  destination: {
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
    required: true
  },
  driverUserId: {
    type: String,
    required: true
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
  // Otros campos que consideres necesarios
}, {
  timestamps: true,
  versionKey: false
});
var Route = _mongoose["default"].model('Route', routeSchema);
var _default = exports["default"] = Route;