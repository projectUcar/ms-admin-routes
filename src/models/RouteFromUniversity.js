import mongoose from 'mongoose';

const routeFromUniversitySchema = new mongoose.Schema({
    origin: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
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

const RouteFromUniversity = mongoose.model('RouteFromUniversity', routeFromUniversitySchema);

export default RouteFromUniversity;