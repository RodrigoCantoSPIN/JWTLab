import React, {useState} from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import {login} from '../services/AuthService';
import {RegExValidation} from '../utils/validation';
import {PASSWORD_PATTERN, USER_PATTERN} from '../utils/constants';

const LoginScreen: React.FC = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const validUsername = RegExValidation(USER_PATTERN, username);
      const validPassword = RegExValidation(PASSWORD_PATTERN, password);
      if (!validUsername || !validPassword) {
        errorHandler(validUsername ? 'Password' : 'Username');
        return;
      }
      await login(username, password);
      navigation.navigate('Profile');
    } catch (err) {
      errorHandler('Login');
    }
  };

  const onChangeUsernameText = (e: string) => {
    setUsername(e);
  };

  const onChangePasswordText = (e: string) => {
    setPassword(e);
  };
  const errorHandler = (err: string) => {
    switch (err) {
      case 'Username':
        setError('Invalid username format');
        break;
      case 'Password':
        setError('Invalid password format');
        break;
      case 'Login':
        setError('Login failed');
        break;
      default:
        break;
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        onChangeText={onChangeUsernameText}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={onChangePasswordText}
      />
      <Button title="Login" onPress={handleLogin} />
      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

export default LoginScreen;
