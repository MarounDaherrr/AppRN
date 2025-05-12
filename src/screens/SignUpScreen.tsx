import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';  
import { useTheme } from '../context/ThemeContext';  
import Button from '../components/Button';

const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password should be at least 6 characters"),
  phone: z.string().min(10, "Phone number should be at least 10 characters"),
});

type FormData = {
  name: string;
  email: string;
  password: string;
  phone: string;
};

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

const SignUpScreen = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const { login } = useAuth();
  const { toggleDarkMode, isDarkMode } = useTheme();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    console.log("Form Data:", data);

    try {
      const response = await fakeApiSignUp(data);
      console.log('User registered successfully:', response);
      login(data.email, data.password);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fakeApiSignUp = async (data: FormData) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ message: 'User registered successfully' }), 2000);
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
      <Button title="Toggle Dark Mode" onPress={toggleDarkMode} />

      <Text style={{ color: isDarkMode ? 'white' : 'black' }}>Name</Text>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextInput
            style={[styles.input, { backgroundColor: isDarkMode ? '#555' : '#fff', color: isDarkMode ? 'white' : 'black' }]}
            placeholder="Enter your name"
            value={field.value}
            onChangeText={field.onChange}
          />
        )}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

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

      <Text style={{ color: isDarkMode ? 'white' : 'black' }}>Phone Number</Text>
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <TextInput
            style={[styles.input, { backgroundColor: isDarkMode ? '#555' : '#fff', color: isDarkMode ? 'white' : 'black' }]}
            placeholder="Enter your phone number"
            value={field.value}
            onChangeText={field.onChange}
            keyboardType="phone-pad"
          />
        )}
      />
      {errors.phone && <Text style={styles.error}>{errors.phone.message}</Text>}

      <Button 
        title={isLoading ? "Signing Up..." : "Sign Up"} 
        onPress={handleSubmit(onSubmit)} 
        disabled={isLoading} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    width: '100%',
    borderRadius: 5,
  },
  error: { color: 'red', marginBottom: 10 },
  toggleButton: { marginBottom: 20 }, 
});

export default SignUpScreen;
