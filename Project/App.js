import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Image } from 'react-native';

import { MealProvider } from './MealContext';
import FoodScreen from './screens/FoodScreen.js';
import HealthScreen from './screens/HealthScreen.js';
import MealScreen from './screens/MealScreen.js';

import healthLogo from './assets/target.png';
import calendarLogo from './assets/compteur-de-calories.png';
import foodLogo from './assets/food-logo.png';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <MealProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let IconComponent;

              if (route.name === 'Health goals') {
                IconComponent = <Image source={healthLogo} style={{ width: size, height: size }} />;
                return IconComponent;
              }

              if (route.name === 'Food database') {
                IconComponent = <Image source={foodLogo} style={{ width: size, height: size }} />;
                return IconComponent;
              }

              if (route.name === 'Meal planning') {
                IconComponent = (
                  <Image source={calendarLogo} style={{ width: size, height: size }} />
                );
                return IconComponent;
              }
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: { display: 'flex' },
          })}>
          <Tab.Screen name="Health goals" component={HealthScreen} />
          <Tab.Screen name="Food database" component={FoodScreen} />
          <Tab.Screen name="Meal planning" component={MealScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </MealProvider>
  );
}

export default App;
