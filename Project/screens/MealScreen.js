import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import MealItem from './MealItem';
import MealContext, { MealProvider } from '../MealContext';

const MealScreen = () => {
  const navigation = useNavigation();
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

  const handleAddMore = () => {
    navigation.navigate('Food database');
  };

  const handleRemoveItem = async (day, meal, index) => {
    const updatedMealPlan = { ...mealPlan };
    updatedMealPlan[day][meal].splice(index, 1);
    setMealPlan(updatedMealPlan);
    updateMealPlan(updatedMealPlan);
  
    try {
      await AsyncStorage.setItem('my_food', JSON.stringify(updatedMealPlan));
      console.log('Meal plan updated successfully.');
    } catch (error) {
      console.log('Error updating meal plan:', error);
    }
  };

  const foodPlan = async () => {
    try {
      const dataFood = await AsyncStorage.getItem('my_food');
      if (dataFood !== null) {
        const arrayData = JSON.parse(dataFood);
        setMealPlan(arrayData);
        updateMealPlan(arrayData);
      } else {
        console.log('No array found');
      }
    } catch (error) {
      console.log('Error :', error);
    }
  };

  const sortedDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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
                <MealItem
                  key={meal}
                  mealName={meal}
                  mealItems={items}
                  onRemoveItem={(index) => handleRemoveItem(day, meal, index)}
                />
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
      <TouchableOpacity style={styles.addButton} onPress={handleAddMore}>
        <Text style={styles.addButtonText}>Add More</Text>
      </TouchableOpacity>
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
  addButton: {
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MealScreen;
