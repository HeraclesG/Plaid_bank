import {
  createNativeStackNavigator
} from '@react-navigation/native-stack'
import SplashScreen from '../screen/SplashScreen'
import DashboardScreen from '../screen/DashboardScreen'


const Stack = createNativeStackNavigator()

export function MainNavigator() {
return (
  <Stack.Navigator>
    <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
    />
    <Stack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{ headerShown: false }}
    />
  </Stack.Navigator>
)
}
