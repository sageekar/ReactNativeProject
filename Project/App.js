import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { MealProvider } from './MealContext';
import FoodScreen from './screens/FoodScreen.js';
import HealthScreen from './screens/HealthScreen.js';
import MealScreen from './screens/MealScreen.js';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <MealProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Health goals" component={HealthScreen} />
          <Tab.Screen name="Food database" component={FoodScreen} />
          <Tab.Screen name="Meal planning" component={MealScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </MealProvider>
  );
}

export default App;