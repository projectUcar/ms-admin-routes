import mongoose from 'mongoose';

const routeToUniversitySchema = new mongoose.Schema({
    origin: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        default: 'Universidad Pontificia Bolivariana',
    },
    city: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    departureDate: {
        type: Date,
        required: true,
    },
    departureTime: {
        type: String,
        required: true,
    },
    availableSeats: {
        type: Number,
        required: true,
        min: 1,
    },
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true,
    },
    driverUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    passengers: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            status: {
                type: String,
                enum: ['pending', 'approved', 'rejected'],
                default: 'pending',
            },
        },
    ],
    status: {
        type: String,
        enum: ['created', 'saved', 'closed', 'modified', 'deleted', 'expired'],
        default: 'created',
    },
},
    {
        timestamps: true,
        versionKey: false,
    }
);

const RouteToUniversity = mongoose.model('routeToUniversity', routeToUniversitySchema);

export default RouteToUniversity;