import cron from 'node-cron';
import RouteFromUniversity from '../models/RouteFromUniversity';
import RouteToUniversity from '../models/RouteToUniversity';
import { hasDatePassed } from './dateUtils.js';

const updateRouteStatus = async () => {
  try {
    // Actualizar rutas desde la universidad
    const routesFromUniversity = await RouteFromUniversity.find();
    for (let route of routesFromUniversity) {
      if (hasDatePassed(route.departureDateTime)) {
        route.status = 'closed';
        await route.save();
      }
    }

    // Actualizar rutas hacia la universidad
    const routesToUniversity = await RouteToUniversity.find();
    for (let route of routesToUniversity) {
      if (hasDatePassed(route.departureDateTime)) {
        route.status = 'close';
        await route.save();
      }
    }

    console.log('Estados de las rutas actualizados correctamente.');
  } catch (error) {
    console.error('Error al actualizar los estados de las rutas:', error);
  }
};

// Función para iniciar los cron jobs
export const startCronJobs = () => {
  cron.schedule('0 0 * * *', updateRouteStatus);
  console.log('Cron jobs iniciados correctamente.');
};
