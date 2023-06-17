import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Image } from 'react-native';

import { MealProvider } from './MealContext';
import FoodScreen from './screens/FoodScreen.js';
import HealthScreen from './screens/HealthScreen.js';
import MealScreen from './screens/MealScreen.js';

import myImage from './assets/compteur-de-calories.png';

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
                IconComponent = (
                  <Image source={myImage} style={{ width: size, height: size, tintColor: color }} />
                );
              } else if (route.name === 'Food database') {
                // todo for other logo
              } else if (route.name === 'Meal planning') {
                // todo
              }

              return IconComponent;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: { display: 'flex' }
          })}
        >
          <Tab.Screen name="Health goals" component={HealthScreen} />
          <Tab.Screen name="Food database" component={FoodScreen} />
          <Tab.Screen name="Meal planning" component={MealScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </MealProvider>
  );
}

export default App;