import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const roles = [
    { id: 'principal', label: 'Principal' },
    { id: 'administrator', label: 'Administrator' },
    { id: 'teacher', label: 'Teacher/Staff' },
    { id: 'support', label: 'Support Staff' }
  ];

  const handleLogin = async () => {
    if (!email || !password || !selectedRole) {
      Alert.alert('Error', 'Please fill all fields and select your role.');
      return;
    }

    setLoading(true);
    try {
      // Simulated login
      const loginData = {
        email,
        password,
        role: selectedRole,
        loginTime: new Date().toISOString()
      };
      
      // Optional: remove console.log in production
      console.log('Logging in with:', loginData);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      navigation.replace('Dashboard', { userRole: selectedRole });
      
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid credentials or network error.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          
          {/* Updated Logo */}
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../assets/icon.png')} // Your white background logo
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          
          <Text style={styles.title}>School Pulse</Text>
          <Text style={styles.subtitle}>Secure Login Portal</Text>

          {/* Login Form */}
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            {/* Role Selection */}
            <Text style={styles.roleLabel}>Select Your Role *</Text>
            <View style={styles.roleContainer}>
              {roles.map((role) => (
                <TouchableOpacity
                  key={role.id}
                  style={[
                    styles.roleButton,
                    selectedRole === role.id && styles.roleButtonSelected
                  ]}
                  onPress={() => setSelectedRole(role.id)}
                >
                  <Text style={[
                    styles.roleText,
                    selectedRole === role.id && styles.roleTextSelected
                  ]}>
                    {role.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <TouchableOpacity 
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Logging in...' : 'Login'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <Text style={styles.footerText}>
            Your role determines access permissions
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  logoContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4361ee',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  form: {
    width: '100%',
    maxWidth: 400,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  roleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  roleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  roleButton: {
    flex: 1,
    minWidth: '48%',
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  roleButtonSelected: {
    backgroundColor: '#4361ee',
    borderColor: '#3a56d4',
  },
  roleText: {
    color: '#666',
    fontWeight: '500',
  },
  roleTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4361ee',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  footerText: {
    marginTop: 20,
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default LoginScreen;
