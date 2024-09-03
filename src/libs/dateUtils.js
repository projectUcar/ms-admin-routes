import moment from 'moment';

// Verifica si la fecha es hoy
export const isToday = (date) => {
  return moment(date).isSame(moment(), 'day');
};

// Verifica si la fecha ha pasado
export const hasDatePassed = (date) => {
  return moment(date).isBefore(moment(), 'day');
};

// Convierte una fecha en un formato específico
export const formatDate = (date, format = 'YYYY-MM-DD') => {
  return moment(date).format(format);
};

export const filterRoutesByTodayAndTomorrow = (routes) => {
  const now = moment(); // Hora y fecha actuales
  const todayStart = moment().startOf('day'); // Inicio del día de hoy (00:00)
  const todayEnd = moment().endOf('day'); // Fin del día de hoy (23:59)
  const tomorrowStart = moment().add(1, 'days').startOf('day'); // Inicio del día de mañana (00:00)
  const tomorrowEnd = moment().add(1, 'days').endOf('day'); // Fin del día de mañana (23:59)

  return routes.filter(route => {
    const routeDateTime = moment(route.departureDateTime);

    // Verificar si la fecha de la ruta es válida y si está en el rango deseado
    if (routeDateTime.isValid()) {
      // Rutas de hoy después de la hora actual
      if (routeDateTime.isBetween(now, todayEnd, null, '[)')) {
        return true;
      }

      // Rutas de mañana en cualquier hora
      if (routeDateTime.isBetween(tomorrowStart, tomorrowEnd, null, '[)')) {
        return true;
      }
    }

    return false;
  });
};