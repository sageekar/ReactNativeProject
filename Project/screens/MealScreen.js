import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import MealSection from './MealSection';

/*const retrieveArray = async () => {
  try {
    const serializedData = await AsyncStorage.getItem('my_array');
    if (serializedData !== null) {
      const arrayData = JSON.parse(serializedData);
      console.log('Retrieved array:', arrayData);
    } else {
      console.log('No array data found.');
    }
  } catch (error) {
    console.log('Error retrieving array:', error);
  }
};

function MealScreen() {
  retrieveArray();
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          retrieveArray();
        }}>
        <Text>Touch !</Text>
      </TouchableOpacity>
    </View>
  )};*/

  const MealScreen = () => {
    const mealPlan  = {
      Monday: {
        Breakfast: [],
        Lunch: [],
        Snack: [],
        Diner: [],
      },
      Tuesday: {
        Breakfast: [],
        Lunch: [],
        Snack: [],
        Diner: [],
      },
      Wednesday: {
        Breakfast: [],
        Lunch: [],
        Snack: [],
        Diner: [],
      },
      Thursday: {
        Breakfast: [],
        Lunch: [],
        Snack: [],
        Diner: [],
      },
      Friday: {
        Breakfast: [],
        Lunch: [],
        Snack: [],
        Diner: [],
      },
      Saturday: {
        Breakfast: [],
        Lunch: [],
        Snack: [],
        Diner: [],
      },
      Sunday: {
        Breakfast: [],
        Lunch: [],
        Snack: [],
        Diner: [],
      },
    };

  return (
    <View>
      {/*Our view for each day */}
      <View>
        <Text>Monday</Text>
        <MealSection mealItems={mealPlan.Monday.Breakfast} />
        <MealSection mealItems={mealPlan.Monday.Lunch} />
        <MealSection mealItems={mealPlan.Monday.Snack} />
        <MealSection mealItems={mealPlan.Monday.Diner} />
      </View>
      <View>
        <Text>Tuesday</Text>
        <MealSection mealItems={mealPlan.Tuesday.Breakfast} />
        <MealSection mealItems={mealPlan.Tuesday.Lunch} />
        <MealSection mealItems={mealPlan.Tuesday.Snack} />
        <MealSection mealItems={mealPlan.Tuesday.Diner} />
      </View>
      <View>
        <Text>Wednesday</Text>
        <MealSection mealItems={mealPlan.Wednesday.Breakfast} />
        <MealSection mealItems={mealPlan.Wednesday.Lunch} />
        <MealSection mealItems={mealPlan.Wednesday.Snack} />
        <MealSection mealItems={mealPlan.Wednesday.Diner} />
      </View>
      <View>
        <Text>Thursday</Text>
        <MealSection mealItems={mealPlan.Thursday.Breakfast} />
        <MealSection mealItems={mealPlan.Thursday.Lunch} />
        <MealSection mealItems={mealPlan.Thursday.Snack} />
        <MealSection mealItems={mealPlan.Thursday.Diner} />
      </View>
      <View>
        <Text>Friday</Text>
        <MealSection mealItems={mealPlan.Friday.Breakfast} />
        <MealSection mealItems={mealPlan.Friday.Lunch} />
        <MealSection mealItems={mealPlan.Friday.Snack} />
        <MealSection mealItems={mealPlan.Friday.Diner} />
      </View>
      <View>
        <Text>Saturday</Text>
        <MealSection mealItems={mealPlan.Saturday.Breakfast} />
        <MealSection mealItems={mealPlan.Saturday.Lunch} />
        <MealSection mealItems={mealPlan.Saturday.Snack} />
        <MealSection mealItems={mealPlan.Saturday.Diner} />
      </View>
      <View>
        <Text>Sunday</Text>
        <MealSection mealItems={mealPlan.Sunday.Breakfast} />
        <MealSection mealItems={mealPlan.Sunday.Lunch} />
        <MealSection mealItems={mealPlan.Sunday.Snack} />
        <MealSection mealItems={mealPlan.Sunday.Diner} />
      </View>
    </View>
  );
};

export default MealScreen;
