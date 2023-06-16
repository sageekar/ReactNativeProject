import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import MealSection from './MealSection';

const MealScreen = () => {
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
    retrieveArray();
  }, []);

  const retrieveArray = async () => {
    try {
      const serializedData = await AsyncStorage.getItem('my_array');
      if (serializedData !== null) {
        const arrayData = JSON.parse(serializedData);
        console.log('Retrieved array:', arrayData);
        setMealPlan(arrayData);
      } else {
        console.log('No array data found.');
      }
    } catch (error) {
      console.log('Error retrieving array:', error);
    }
  };

  const sortedDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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
});

export default MealScreen;