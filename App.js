import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import ReportScreen from './src/screens/ReportScreen';
import InsightsScreen from './src/screens/InsightsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerShown: false, // Hide header for all screens
          gestureEnabled: true,
          animationEnabled: true
        }}
      >
        {/* Login Screen - No header */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
        />
        
        {/* Dashboard - Optional: Show header if you want */}
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen}
          options={{
            headerShown: true,
            title: 'Dashboard',
            headerBackTitle: 'Logout', // Shows "Logout" instead of "Back"
          }}
        />
        
        {/* Other screens - Optional headers */}
        <Stack.Screen 
          name="Report" 
          component={ReportScreen}
          options={{
            headerShown: true,
            title: 'Report Incident'
          }}
        />
        
        <Stack.Screen 
          name="Insights" 
          component={InsightsScreen}
          options={{
            headerShown: true,
            title: 'Analytics Insights'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}