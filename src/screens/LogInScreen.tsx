import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../context/AuthContext'; 
import { useTheme } from '../context/ThemeContext'; 
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import Button from '../components/Button';

type FormData = {
  email: string;
  password: string;
};

type LogInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LogInScreen = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const { login, user } = useAuth();  
  const [errorMessage, setErrorMessage] = useState('');
  const { toggleDarkMode, isDarkMode } = useTheme();  
  const navigation = useNavigation<LogInScreenNavigationProp>();

  const onSubmit = (data: FormData) => {
    console.log("Trying to log in with:", data);
    if ((data.email === user.email && data.password === user.password) || (data.email === 'eurisko' && data.password === 'academy2025')) {
      console.log("Credentials verified! Redirecting to OTP Verification...");
      navigation.navigate("VerificationScreen");
    } else {
      setErrorMessage("Invalid credentials");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
      <Button title="Toggle Dark Mode" onPress={toggleDarkMode} />

      <Text style={{ color: isDarkMode ? 'white' : 'black' }}>Email</Text>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextInput
            style={[styles.input, { backgroundColor: isDarkMode ? '#555' : '#fff', color: isDarkMode ? 'white' : 'black' }]}
            placeholder="Enter your email"
            value={field.value}
            onChangeText={field.onChange}
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Text style={{ color: isDarkMode ? 'white' : 'black' }}>Password</Text>
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextInput
            style={[styles.input, { backgroundColor: isDarkMode ? '#555' : '#fff', color: isDarkMode ? 'white' : 'black' }]}
            placeholder="Enter your password"
            secureTextEntry
            value={field.value}
            onChangeText={field.onChange}
          />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

      <Button title="Log In" onPress={handleSubmit(onSubmit)} />
      <Button title="Don't have an account? Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center', alignItems: 'center' },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    width: '100%',
    borderRadius: 5,
  },
  error: { color: 'red', marginBottom: 10 },
});

export default LogInScreen;
