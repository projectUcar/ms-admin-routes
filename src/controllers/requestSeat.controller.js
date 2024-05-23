import { sendToQueue } from '../libs/rabbitmq';

export const requestSeat = async (req, res) => {
    try {
        const { idRoute } = req.params;
        const idUser = req.user.id;
        const { idDriver } = req.body;
      
        const message = { idRoute, idUser, idDriver, message: "Solicitud de cupo" };

        await sendToQueue('seat_requests', message);
      
        res.status(200).json({ message: 'Solicitud de cupo enviada con éxito' });
    } catch (error) {
        console.error('Error al solicitar el cupo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
