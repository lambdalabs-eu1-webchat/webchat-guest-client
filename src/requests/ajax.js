import axios from 'axios';

import { DOMAIN, PATH } from '../utils/constants';

export async function loginRequest(name, passcode) {
  // login and return the user and token
  const res = await axios.post(`${DOMAIN}${PATH.users}/chat`, {
    name,
    passcode
  });
  return res.data; // {user, token}
}

export async function getHotel(hotel_id, token) {
  const axiosConfig = {
    headers: { Authorization: token }
  };

  const res = await axios.get(
    `${DOMAIN}${PATH.hotel}/${hotel_id}/chat`,
    axiosConfig
  );
  return res.data;
}
