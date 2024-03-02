import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { SettingsScreen } from './screens/SettingsScreen';
import { LoginScreen } from './screens/LoginScreen';
import { SignupScreen } from './screens/SignupScreen';
import { MenuScreen } from './screens/MenuScreen';
import { ShoppingScreen } from './screens/ShoppingScreen';
import { ScanModal } from './screens/ScanModal';
import { OrderHistoryScreen } from './screens/OrderHistoryScreen';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TamaguiProvider } from 'tamagui';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useColorScheme } from 'react-native'

import { tamaguiConfig } from './tamagui.config'
import { Notebook, ScanBarcode, Settings, ShoppingCart } from '@tamagui/lucide-icons';

import { useContext, useEffect } from 'react';
import { useFonts } from 'expo-font';

import { AuthContext, AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

const queryClient = new QueryClient()

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MenuStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();


const MenuStackScreen = ({ navigation }) => {

  return (
    <MenuStack.Navigator>
      <MenuStack.Screen name="Menu" component={MenuScreen} options={
        {
          headerRight: () => (
            <>
              <ShoppingCart
                onPress={() => navigation.navigate('Shopping')}
              />
              <ScanBarcode
                onPress={() => navigation.navigate('Scan')}
              />
            </>
          ),
        }
      } />
      <MenuStack.Screen name="Shopping" component={ShoppingScreen} />
      <MenuStack.Screen name="Scan" component={ScanModal} options={{ presentation: 'modal' }} />
    </MenuStack.Navigator>
  );
}

const SettingsStackScreen = ({ navigation }) => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Order" component={OrderHistoryScreen} />
    </SettingsStack.Navigator>
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
      <Tab.Screen name="SettingsStack" component={SettingsStackScreen} options={
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
  const { currentUser } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {currentUser ? (
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Home" component={MyTabs} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignupScreen} />
        </Stack.Navigator>
      )}
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
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (loaded) {
      // can hide splash screen here
    }
  }, [loaded])

  if (!loaded) {
    return null;
  }

  return (
    <Providers />
  );
}


