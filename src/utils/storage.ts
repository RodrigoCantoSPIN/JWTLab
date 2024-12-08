// Utility file where students are expected to implement secure storage functions
import * as Keychain from 'react-native-keychain';

export const storeToken = async (token: string) => {
  await Keychain.setGenericPassword('token', token);
};

export const getToken = async () => {
  const credentials = await Keychain.getGenericPassword();
  return credentials ? credentials.password : null;
};

export const deleteToken = async () => {
  await Keychain.resetGenericPassword();
};
