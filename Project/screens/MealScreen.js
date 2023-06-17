import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import MealSection from './MealSection';
import MealContext, { MealProvider } from '../MealContext';

const MealScreen = () => {
  const { mealPlan: contextMealPlan, updateMealPlan } = useContext(MealContext);

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
    setMealPlan(contextMealPlan);
  }, [contextMealPlan]);

  const retrieveArray = async () => {
    try {
      const serializedData = await AsyncStorage.getItem('my_array');
      if (serializedData !== null) {
        const arrayData = JSON.parse(serializedData);
        console.log('Retrieved array:', arrayData);
        setMealPlan(arrayData);
        updateMealPlan(arrayData); // Update the meal plan in the context
      } else {
        console.log('No array data found.');
      }
    } catch (error) {
      console.log('Error retrieving array:', error);
    }
  };

  const sortedDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Calculate total calories for each day and the overall total calories
  const totalCaloriesByDay = sortedDays.reduce((totals, day) => {
    const dayTotal = Object.values(mealPlan[day]).reduce((total, mealItems) => {
      return (
        total +
        mealItems.reduce((mealTotal, item) => {
          return mealTotal + item.calories * item.quant;
        }, 0)
      );
    }, 0);
    totals[day] = dayTotal;
    return totals;
  }, {});

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {sortedDays.map((day) => (
          <View key={day} style={styles.dayContainer}>
            <Text style={styles.dayText}>{day}</Text>
            {mealPlan[day] ? (
              Object.entries(mealPlan[day]).map(([meal, items]) => (
                <MealSection key={meal} mealName={meal} mealItems={items} />
              ))
            ) : (
              <Text style={styles.noItemsText}>No items</Text>
            )}
            <View style={styles.dayTotalCaloriesContainer}>
              <Text style={styles.dayTotalCaloriesText}>
                Total Calories: {totalCaloriesByDay[day]}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  dayContainer: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  dayText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  dayTotalCaloriesContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
  },
  dayTotalCaloriesText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  noItemsText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#888',
  },
});

export default MealScreen;
