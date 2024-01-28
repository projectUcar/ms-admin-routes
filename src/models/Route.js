import mongoose from 'mongoose';

const routeSchema = new mongoose.Schema({
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  description: { type: String },
  departureTime: { type: Date, required: true },
  creationDateTime: { type: Date, default: Date.now },
  availableSeats: { type: Number, required: true },
  status: { type: String, enum: ['created', 'saved', 'closed', 'modified', 'deleted', 'expired'], default: 'created' },
  driverUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  passengerRequests: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  }],
});

const Route = mongoose.model('Route', routeSchema);

export default Route;