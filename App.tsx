import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen';
import LandingScreen from './screens/LandingScreen';
import { Provider } from "react-redux";
import { store, persistor } from './store';
import { PersistGate } from "redux-persist/integration/react"
import GettingStartedScreen from './screens/GettingStartedScreen';
import ProfileScreen from './screens/ProfileScreen';
import HealthScreen from './screens/HealthScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import WalkScreen from './screens/WalkScreen';
import PlacesScreen from './screens/PlacesScreen';


export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
              <Stack.Navigator initialRouteName="Landing">
                <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
                <Stack.Screen name="GettingStarted" component={GettingStartedScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Walk" component={WalkScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Health" component={HealthScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Places" component={PlacesScreen} options={{ headerShown: false }} />
              </Stack.Navigator>
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
};
