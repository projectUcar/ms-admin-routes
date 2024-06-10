import axios from 'axios';
import RouteFromUniversity from '../models/RouteFromUniversity';
import RouteToUniversity from '../models/RouteToUniversity';
import { ROUTE_TO_UNIVERSITY_SERVICE_URL, ROUTE_FROM_UNIVERSITY_SERVICE_URL } from '../config';

export const getRouteById = async (id, token) => {
  try {
    let collection = '';  
    const response = await axios.get(`${ROUTE_TO_UNIVERSITY_SERVICE_URL}/id/${id}`, {
        headers: { Authorization: token },
    });

    if (response.status === 204) {
        const response = await axios.get(`${ROUTE_FROM_UNIVERSITY_SERVICE_URL}/id/${id}`, {
            headers: { Authorization: token },
        });
        collection = 'RouteFromUniversity';
        let route = response.data.route;
        const modifiedRouteInfo = { ...route }
        modifiedRouteInfo.collection = collection;
        return modifiedRouteInfo;
    } else {
        collection = 'RouteToUniversity';
        let route = response.data.route;
        const modifiedRouteInfo = { ...route }
        modifiedRouteInfo.collection = collection;
        return modifiedRouteInfo;
    }

  } catch (error) {
    console.error('Error al obtener datos de la ruta:', error);
    throw error;
  }
};

export const addPassangerToRoute = async (collection, idRoute, idUser) => {
    try {
        const collectionRoute = collection === 'RouteToUniversity' ? RouteToUniversity : RouteFromUniversity;

        const route = await collectionRoute.findById(idRoute).exec();

        if (!route) {
            return 'Ruta no encontrada';
        }

        if (route.availableSeats <= 0) {
            throw new Error('No hay asientos disponibles en esta ruta.');
        }

        const passengerExists = await collectionRoute.exists({ _id: idRoute, 'passengers.user': idUser });

        if (passengerExists) {
            return 'El usuario ya es pasajero de esta ruta.';
        }

        // Agregar el nuevo pasajero al array de pasajeros
        route.passengers.push({
            user: idUser,
            status: 'pending',
        });

        route.availableSeats -= 1;

        // Guardar la ruta actualizada
        await route.save();

    } catch (error) {
        throw new Error(`Error al agregar pasajero a la ruta: ${error}`);
    }

};