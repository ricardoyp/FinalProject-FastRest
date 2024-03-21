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
import { PromotionsScreen } from './screens/PromotionsScreen';
import { TicketScreen } from './screens/TicketScreen';
import { SignupAdminScreen } from './screens/SignUpAdminScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { AdminAddPlate } from './screens/AdminAddPlateScreen';
import { AdminUpdatePlate } from './screens/AdminUpdatePlateScreen';
import { AdminDeletePlate } from './screens/AdminDeletePlateScreen';

import { QueryClientProvider } from '@tanstack/react-query'
import { TamaguiProvider } from 'tamagui';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useColorScheme } from 'react-native'

import { tamaguiConfig } from './tamagui.config'
import { Notebook, Settings } from '@tamagui/lucide-icons';

import { useContext, useEffect } from 'react';
import { useFonts } from 'expo-font';

import { AuthContext, AuthProvider } from './context/AuthContext';
import { CartContext, CartProvider } from './context/CartContext';
import { queryClient } from './config/queryClient';
import { ShoppingCartIcon } from './components/ShoppingCartIcon';
import { AdminCreatePromotion } from './screens/AdminCreatePromotion';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const Tab = createBottomTabNavigator(); 

const Stack = createNativeStackNavigator();
const MenuStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

const MenuStackScreen = ({ navigation }) => {

const { numberOfItems } = useContext(CartContext)

  return (
    <MenuStack.Navigator>
      <MenuStack.Screen name="Menu" component={MenuScreen} options={{ headerRight: () => (<ShoppingCartIcon onPress={() => navigation.navigate('Shopping')} />) }} />
      <MenuStack.Screen name="Shopping" component={ShoppingScreen} />
      <MenuStack.Screen name="Scan" component={ScanModal} options={{ presentation: 'modal' }} />
    </MenuStack.Navigator>
  );
}

const ProfileStackScreen = ({ navigation }) => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="ProfileView" component={ProfileScreen} options={{headerShown: false}}/>
    </ProfileStack.Navigator>
  );
}

const SettingsStackScreen = ({ navigation }) => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Order" component={OrderHistoryScreen} />
      <SettingsStack.Screen name="Ticket" component={TicketScreen} />
      <SettingsStack.Screen name="Promotions" component={PromotionsScreen} />
      <SettingsStack.Screen name="Profile" component={ProfileStackScreen} />
      <SettingsStack.Screen name="AdminAddPlate" component={AdminAddPlate} />
      <SettingsStack.Screen name="AdminUpdatePlate" component={AdminUpdatePlate} />
      <SettingsStack.Screen name="AdminDeletePlate" component={AdminDeletePlate} />
      <SettingsStack.Screen name="AdminCreatePromotion" component={AdminCreatePromotion} />
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
          <Stack.Screen options={{ headerShown: false }} name="SignUpAdmin" component={SignupAdminScreen} />
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


