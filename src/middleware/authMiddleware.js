import axios from 'axios';
import { AUTH_MS_URL } from '../config';

export const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const response = await axios.get(`${AUTH_MS_URL}`, {
      headers: {
        Authorization: token,
      },
    });

    if (response.data) {
      req.user = response.data.user;
      next();
    } else {
      res.status(401).json({ error: 'Token inválido' });
    }
  } catch (error) {
    if (error.response) {
      const statusCode = error.response.status;
      if (statusCode === 401) {
        return res.status(401).json({ error: 'Token inválido' });
      }
      return res.status(statusCode).json({ error: 'Error inesperado' });
    }

    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
