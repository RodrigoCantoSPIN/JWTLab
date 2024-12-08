import {StackActions, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';

// Basic axios instance, expecting students to add interceptors
const api = axios.create({
  baseURL: 'https://example.com/api', // Placeholder URL
});

axios.interceptors.request.use(async config => {
  const credentials = await Keychain.getGenericPassword();
  if (credentials) {
    const {token, expiresAt} = JSON.parse(credentials.password);

    // Check if the token is expired
    if (Date.now() > expiresAt) {
      console.log('Token expired');
      // Implement token refresh logic or redirect to login
    } else {
      // Attach token to request headers
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

axios.interceptors.response.use(
  response => response,
  async error => {
    // Check if the error was due to an expired token or refresh failure
    if (error.response && error.response.status === 401) {
      console.log('Session expired. Redirecting to login.');
      // Clear stored credentials
      await Keychain.resetGenericPassword();
      const navigation = useNavigation();
      // Redirect to login screen (assuming you're using navigation)
      navigation.dispatch(StackActions.replace('LoginScreen'));
    }
    return Promise.reject(error);
  },
);
export default api;
