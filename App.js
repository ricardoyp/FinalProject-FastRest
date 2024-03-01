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
import { Plus, ShoppingCart } from '@tamagui/lucide-icons';
import { ShoppingScreen } from './screens/ShoppingScreen';

const queryClient = new QueryClient()

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MenuStack = createNativeStackNavigator();

const MenuStackScreen = ({ navigation }) => {
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen name="Menu" component={MenuScreen} options={
        {
          tabBarIcon: ({ color, size }) => (
            <Plus size={size} color={color} />
          ),
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
              <Plus size={size} color={color} />
            ),
          }} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
      <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignupScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Home" component={MyTabs} />
    </Stack.Navigator>
  );
}

export default function App() {
  const colorScheme = useColorScheme()

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme}>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <MyStack />
          </ThemeProvider>
        </TamaguiProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}


