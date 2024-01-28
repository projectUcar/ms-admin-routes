import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const authenticateUser = (req, res, next) => {
  const authorizationHeader = req.get('Authorization');

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token de autorización no proporcionado' });
  }

  const token = authorizationHeader.substring(7);

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    req.userId = decodedToken.userId; // Agrega el ID de usuario a la solicitud
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token de autorización inválido' });
  }
};