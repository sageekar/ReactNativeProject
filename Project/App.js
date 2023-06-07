// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HealthScreen from './screens/HealthScreen.js';
import FoodScreen from './screens/FoodScreen.js';
import MealScreen from './screens/MealScreen.js';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Health goals" component={HealthScreen} />
        <Tab.Screen name="Food database" component={FoodScreen} />
        <Tab.Screen name="Meal planning" component={MealScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;