import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'; // ← Make sure React is imported

// LAZY LOAD screens to prevent initialization errors
const LoginScreen = React.lazy(() => import('./src/screens/LoginScreen'));
const DashboardScreen = React.lazy(() => import('./src/screens/DashboardScreen'));
const DelayLogScreen = React.lazy(() => import('./src/screens/DelayLogScreen'));
const InfractionScreen = React.lazy(() => import('./src/screens/InfractionScreen'));

const Stack = createStackNavigator();

// Simple loading component
const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Loading...</Text>
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      <React.Suspense fallback={<LoadingScreen />}>
        <Stack.Navigator 
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="DelayLog" component={DelayLogScreen} />
          <Stack.Screen name="InfractionLog" component={InfractionScreen} />
        </Stack.Navigator>
      </React.Suspense>
    </NavigationContainer>
  );
}