import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Screens/Home';
import Login from './Screens/Login';
import { Provider } from 'react-redux'
import { Store } from './redux/store';
import Map from './Screens/Map';
import LottieSplashScreen from 'react-native-lottie-splash-screen';

const Stack = createStackNavigator();

function App() {
  useEffect(() => {
    LottieSplashScreen.hide(); // here
  }, []);
  return (
    <Provider store={Store}>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#0080ff'
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold'
          }
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
        />
          <Stack.Screen
          name="Map"
          component={Map}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}

export default App;