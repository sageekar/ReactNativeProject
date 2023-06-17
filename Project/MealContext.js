import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MealContext = createContext();

export const MealProvider = ({ children }) => {
  const [mealPlan, setMealPlan] = useState({
    Monday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
    Tuesday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
    Wednesday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
    Thursday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
    Friday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
    Saturday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
    Sunday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
  });

  useEffect(() => {
    foodPlan();
  }, []);

  const foodPlan = async () => {
    try {
      const serializedData = await AsyncStorage.getItem('my_array');
      if (serializedData !== null) {
        const arrayData = JSON.parse(serializedData);
        setMealPlan(arrayData);
      } else {
        console.log('No array data found.');
      }
    } catch (error) {
      console.log('Error retrieving array:', error);
    }
  };

  const updateMealPlan = (newMealPlan) => {
    setMealPlan(newMealPlan);
  };

  return (
    <MealContext.Provider value={{ mealPlan, updateMealPlan }}>{children}</MealContext.Provider>
  );
};

export default MealContext;
