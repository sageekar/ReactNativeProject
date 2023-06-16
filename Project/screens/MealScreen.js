import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState} from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import MealSection from './MealSection';


// Ton Code déjà là
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


  // Mon Code qui marchait avant d'essayer de faire la connexion

  const MealScreen = () => {
    const [mealPlan, setMealPlan]  = useState({
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
  });

  // Mon Code qui marchait avant d'essayer de faire la connexion
  return(
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {Object.entries(mealPlan).map(([day, meals]) => (
          <View key={day} style={styles.dayContainer}>
            <Text style={styles.dayText}>{day}</Text>
            {Object.entries(meals).map(([meal, items]) => (
              <MealSection key={meal} mealName={meal} mealItems={items} />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// Mon Code qui marchait avant d'essayer de faire la connexion
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
  dayText:{
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
});


  // Tentative connexion part 1
  // const MealScreen = ({ route }) => {
  //   const {Meal} = route.params;
  //   const {Day} = route.params;
  //   const [meals, setMeals] = useState([]);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const serializedData = await AsyncStorage.getItem('my_array');
  //         const arrayData = serializedData ? JSON.parse(serializedData) : {};
  //         const mealsForDayAndMeal = arrayData[Day]?.[Meal] || [];
  //         setMeals(mealsForDayAndMeal);
  //         } catch (error) {
  //           console.log("Error fetching meals:", error);
  //         }
  //     };
      
  //     fetchData();
  //   }, [Day, Meal]);

// Test connexion part 2
//   return(
//     <View style={styles.container}>
//       <Text style={styles.title}>Meal for the {Meal} on {Day}</Text>
//       {meals.length > 0 ? (
//         meals.map((Meal, index) => (
//           <Text key={index} style={styles.mealText}>
//             {Meal}
//           </Text>
//         ))
//       ) : (
//         <Text style={styles.noMealText}>No meals added for {Meal} on {Day}</Text>
//       )}
//     </View>
//   );
// };

// Test connexion part 3
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   title:{
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   mealText: {
//     marginBottom: 8,
//   },
//   noMealText: {
//     fontStyle: 'italic',
//   },
// });

export default MealScreen;
