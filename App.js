import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import DelayLogScreen from './src/screens/DelayLogScreen';
import InfractionScreen from './src/screens/InfractionScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen} 
          options={{ headerShown: false }}
        />
        {/* Add these two new screens */}
        <Stack.Screen 
          name="DelayLog" 
          component={DelayLogScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="InfractionLog" 
          component={InfractionScreen} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}