import RouteFromUniversity from '../models/RouteFromUniversity.js';
import RouteToUniversity from '../models/RouteToUniversity.js';
import VehicleInformation from '../models/VehicleInformation.js';
import { getUserById } from './userService.js'; // Importa la función para obtener información del conductor
import { getVehicleById } from './vehicleService.js';

export async function routesWithDriverName(routes, token) {
    try {
      // Mapea sobre las rutas y agrega el nombre del conductor a cada una
      const routesWithDriverName = await Promise.all(routes.map(async route => {
        const driver = await getUserById(route.driverUserId, token);
        const driverName = driver ? `${driver.firstName} ${driver.lastName}` : 'Conductor no encontrado';
        const modifiedRoute = { ...route.toObject() };
        modifiedRoute.driverName = driverName;
        return modifiedRoute;
      }));
  
      return routesWithDriverName;
    } catch (error) {
      console.error('Error al obtener rutas con nombres de conductores:', error);
      throw new Error('Error al obtener rutas con nombres de conductores');
    }
  };

export async function routesWithVehicle(routes, token) {
    try {

      const vehicle = await getVehicleById(routes.vehicleId, token);
      const vehicleInfo = new VehicleInformation(
        vehicle.brand,
        vehicle.model,
        vehicle.line,
        vehicle.plate,
        vehicle.color,
        vehicle.doors
        );
        return vehicleInfo;

    } catch (error) {
      console.error('Error al obtener rutas con informacion de vehiculos:', error);
      throw new Error('Error al obtener rutas con informacion de vehiculos');
    }
  };
