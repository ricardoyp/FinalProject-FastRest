import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { SettingsScreen } from './screens/HomeScreen';
import { LoginScreen } from './screens/LoginScreen';
import { SignupScreen } from './screens/SignupScreen';
import { MenuScreen } from './screens/MenuScreen';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TamaguiProvider } from 'tamagui';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useColorScheme } from 'react-native'

import { tamaguiConfig } from './tamagui.config'
import { Notebook, Settings, ShoppingCart } from '@tamagui/lucide-icons';
import { ShoppingScreen } from './screens/ShoppingScreen';
import { CartProvider } from './context/CartContext';
import { auth } from './config/firebase';
import { AuthProvider } from './context/AuthContext';

const queryClient = new QueryClient()

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MenuStack = createNativeStackNavigator();


const MenuStackScreen = ({ navigation }) => {

  return (
    <MenuStack.Navigator>
      <MenuStack.Screen name="Menu" component={MenuScreen} options={
        {
          headerRight: () => (
            <ShoppingCart
              onPress={() => navigation.navigate('Shopping')}
            />
          ),
        }
      } />
      <MenuStack.Screen name="Shopping" component={ShoppingScreen} />
    </MenuStack.Navigator>
  );
}

const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="MenuStack"
        component={MenuStackScreen}
        options={
          {
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Notebook size={size} color={color} />
            ),
          }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={
        {
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} />
          ),
        }} />
    </Tab.Navigator>
  );
};

const MyStack = () => {
  const user = auth.currentUser;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignupScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const Providers = () => {
  const colorScheme = useColorScheme()

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <AuthProvider>
            <CartProvider>
              <MyStack />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  )
}

export default function App() {
  return (
    <Providers />
  );
}


