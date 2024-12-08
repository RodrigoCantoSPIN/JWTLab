import {deleteToken, storeToken} from '../utils/storage';

const expirationTime = Date.now() + 60 * 60 * 1000; // Token expires in 1 hour
const fakeJWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

export const login = async (username: string, password: string) => {
  // Mock function for login, expecting students to implement secure storage
  if (username === 'username@gmail.com' && password === 'passWord123.') {
    storeToken(JSON.stringify({token: fakeJWT, expiresAt: expirationTime}));
    return true;
  } else {
    throw new Error('Invalid credentials');
  }
};

export const logout = async () => {
  // Function for clearing secure storage (to be implemented by students)
  deleteToken();
};
