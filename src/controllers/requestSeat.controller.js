import { sendToQueue } from '../libs/rabbitmq';
import { QUEUE } from '../config';

export const requestSeat = async (req, res) => {
    try {
        const { idRoute } = req.params;
        const idUser = req.user.id;
        const { idDriver } = req.body;
        const token = req.headers.authorization;
      
        const message = { idRoute, idUser, idDriver, token, message: "Solicitud de cupo" };

        await sendToQueue(QUEUE, message);
      
        res.status(200).json({ message: 'Solicitud de cupo enviada con éxito' });
    } catch (error) {
        console.error('Error al solicitar el cupo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
