import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen';
import LandingScreen from './screens/LandingScreen';
import { Provider } from "react-redux";
import { store, persistor } from './store';
import { PersistGate } from "redux-persist/integration/react"
import GettingStartedScreen from './screens/GettingStartedScreen';
import DetailsScreen from './screens/DetailsScreen';
import HealthScreen from './screens/HealthScreen';
import ActivityScreen from './screens/ActivityScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler'

// type RootStackParamList = {
//   Landing: string,
//   Home: string,
// }


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
                <Stack.Screen name="Activity" component={ActivityScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Health" component={HealthScreen} options={{ headerShown: false }} />
              </Stack.Navigator>
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
