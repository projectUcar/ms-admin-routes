import axios from 'axios';
import {USER_SERVICE_URL} from '../config'

export async function getUserById(userId, token) {
  try {
    const response = await axios.get(`${USER_SERVICE_URL}/${userId}`, {headers: {
      Authorization: token
    }});
    return response.data.user;
  } catch (error) {
    console.error('Error al obtener el usuario por ID:', );
    throw error;
  }
}
