import axios from 'axios';

import { DOMAIN, PATH } from '../utils/constants';

export async function loginRequest(name, passcode) {
  try {
    // login and return the user and token
    const res = await axios.post(`${DOMAIN}${PATH.users}/chat`, {
      name,
      passcode,
    });
    return res.data; // {user, token}
  } catch (error) {
    // return the error message
    return error.response.data.message;
  }
}

export async function getHotel(hotel_id) {
  try {
    const res = await axios.get(`${DOMAIN}${PATH.hotel}/${hotel_id}`);
    return res.data;
  } catch (error) {
    return error.response.data.message;
  }
}
