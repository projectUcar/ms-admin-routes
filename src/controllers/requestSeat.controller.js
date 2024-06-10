import { sendToQueue } from '../libs/rabbitmq';
import { QUEUE } from '../config';
import { addPassangerToRoute, getRouteById } from '../libs/routeService';

export const requestSeat = async (req, res) => {
    try {
        const { idRoute } = req.params;
        const idUser = req.user.id;
        const { idDriver } = req.body;
        const token = req.headers.authorization;
      
        const message = { idRoute, idUser, idDriver, token, information: "Solicitud de cupo" };

        const route = await getRouteById(idRoute, token);

        
        const collection = route.collection;

        const updatedRoute = await addPassangerToRoute(collection, idRoute, idUser);
        

        await sendToQueue(QUEUE, message);
      
        res.status(200).json({ message: 'Solicitud de cupo enviada con éxito', route: updatedRoute });
    } catch (error) {
        console.error('Error al solicitar el cupo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
