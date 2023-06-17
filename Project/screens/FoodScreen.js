import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';

import MealContext, { MealProvider } from '../MealContext';

const FoodScreen = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [Quantity, setQuantity] = useState('');
  const [Day, setDay] = useState('Monday');
  const [Meal, setMeal] = useState('Breakfast');
  const [details, setDetails] = useState(null);
  const { mealPlan, updateMealPlan } = useContext(MealContext);

  useEffect(() => {
    retrieveArray();
  }, []);

  const handleQuantityChange = (text) => {
    // Filter out non-numeric characters
    const numericText = text.replace(/[^0-9]/g, '');
    setQuantity(numericText);
  };

  const handleDayChange = (text) => {
    setDay(text);
  };

  const handleMealChange = (value) => {
    setMeal(value);
  };

  const retrieveArray = async () => {
    try {
      const serializedData = await AsyncStorage.getItem('my_array');
      if (serializedData !== null) {
        const arrayData = JSON.parse(serializedData);
        console.log('Retrieved array:', arrayData);
        updateMealPlan(arrayData);
      } else {
        console.log('No array data found.');
      }
    } catch (error) {
      console.log('Error retrieving array:', error);
    }
  };

  const storeArray = async (quantity, Meal, Day, label, cal) => {
    try {
      const arrayData = { ...mealPlan };

      if (!arrayData[Day]) {
        arrayData[Day] = {};
      }
      if (!arrayData[Day][Meal]) {
        arrayData[Day][Meal] = [];
      }

      const item = { name: label, quant: quantity, calories: cal };
      arrayData[Day][Meal].push(item);

      const updatedData = JSON.stringify(arrayData);
      await AsyncStorage.setItem('my_array', updatedData);
      console.log('Array stored successfully!');
      updateMealPlan(arrayData); // Update the meal plan in the contex
    } catch (error) {
      console.log('Error storing array:', error);
    }
  };

  const handleSearch = async () => {
    const appId = '2eb6fd30';
    const appKey = '4529435b5d08170effb7fa9cb5db51c0';

    try {
      const response = await axios.get(
        `https://api.edamam.com/api/food-database/v2/parser?ingr=${query}&app_id=${appId}&app_key=${appKey}`
      );
      setSearchResults(response.data.hints);
      if (response.data.hints.length === 0) {
        setError('No food matching the query was found');
      } else {
        setError(null);
      }
    } catch (error) {
      setError('Error. Please try again.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setDetails(null);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {details && details.food && (
              <Text>
                {details.food.label}
                {'\n'}Cal: {details.food.nutrients.ENERC_KCAL}
                {'\n'}Fat: {details.food.nutrients.FAT}
                {'\n'}Carbs: {details.food.nutrients.CHOCDF}
                {'\n'}Protein: {details.food.nutrients.PROCNT}
              </Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Quantity"
              onChangeText={handleQuantityChange}
              value={Quantity}
            />
            <Text style={styles.label}>Select day :</Text>
            <Picker selectedValue={Day} style={styles.picker} onValueChange={handleDayChange}>
              <Picker.Item label="Monday" value="Monday" />
              <Picker.Item label="Tuesday" value="Tuesday" />
              <Picker.Item label="Wednesday" value="Wednesday" />
              <Picker.Item label="Thursday" value="Thursday" />
              <Picker.Item label="Friday" value="Friday" />
              <Picker.Item label="Saturday" value="Saturday" />
              <Picker.Item label="Sunday" value="Sunday" />
            </Picker>
            <Text style={styles.label}>Select meal :</Text>
            <Picker selectedValue={Meal} style={styles.picker} onValueChange={handleMealChange}>
              <Picker.Item label="Breakfast" value="Breakfast" />
              <Picker.Item label="Lunch" value="Lunch" />
              <Picker.Item label="Snack" value="Snack" />
              <Picker.Item label="Dinner" value="Dinner" />
            </Picker>
            <Button
              title="Update"
              onPress={() => {
                setModalVisible(!modalVisible);
                storeArray(
                  Quantity,
                  Meal,
                  Day,
                  details.food.label,
                  details.food.nutrients.ENERC_KCAL
                );
              }}
            />
          </View>
        </View>
      </Modal>
      <TextInput style={styles.searchInput} placeholder="Search food..." onChangeText={setQuery} />
      <Button title="Search" onPress={handleSearch} />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <FlatList
        data={searchResults}
        renderItem={({ item }) =>
          item.food && (
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
                setDetails(item);
              }}>
              <Text style={styles.item}>
                {item.food.label}
                {'\n'}Cal: {item.food.nutrients.ENERC_KCAL}
              </Text>
            </TouchableOpacity>
          )
        }
        keyExtractor={(item, index) => item.food.foodId + '-' + index}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  textStyle: {
    textAlign: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  errorText: {
    color: 'red',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    margin: 50,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  picker: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    margin: 5,
  },
});

export default FoodScreen;
