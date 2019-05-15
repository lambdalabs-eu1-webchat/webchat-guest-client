export const DOMAIN = 'https://web-chat-labs.herokuapp.com';
// export const DOMAIN = 'http://localhost:7000';

export const PATH = {
  users: '/api/users',
  auth: '/api/auth',
  hotel: '/api/hotel',
  subscribe: '/api/subscription',
};

export const SOCKET = {
  connection: 'connection',
  chat_log: 'chat_log',
  message: 'message',
  login: 'login',
  failed_login: 'failed_login',
  rating: 'rating',
  typing: 'typing',
  stopped_typing: 'stopped_typing',
  confirm_done_ticket: 'confirm_done_ticket',
};
