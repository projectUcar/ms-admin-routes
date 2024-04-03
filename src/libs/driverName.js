import { getUserById } from './userService.js'; // Importa la función para obtener información del conductor

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