import axios from 'axios';
import { VEHICLE_BY_ID_URL } from '../config.js';

export async function getAvilableSeats(vehicleId, availableSeats, token) {
    try {
        const response = await axios.get(`${VEHICLE_BY_ID_URL}/${vehicleId}`,
        {
            headers: { Authorization: token },
        });
        const vehicle =  response.data;

        return availableSeats > vehicle.seats? true : false;

    } catch (error) {
        console.error('Error al obtener el vehiculo por ID:', );
    throw error;
    }
}

export async function getVehicleById(vehicleId, token) {
    try {
        const response = await axios.get(`${VEHICLE_BY_ID_URL}/${vehicleId}`,
        {
            headers: { Authorization: token },
        });
        const vehicle =  response.data;

        return vehicle;

    } catch (error) {
        console.error('Error al obtener el vehiculo por ID:', );
    throw error;
    }
}
