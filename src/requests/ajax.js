import axios from 'axios';

import { DOMAIN, PATH } from '../utils/constants';

export async function loginRequest(name, passcode) {
  try {
    // login and return the user and token
    debugger;
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
