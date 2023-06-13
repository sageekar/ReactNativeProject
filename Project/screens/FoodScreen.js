import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import React, { useState } from 'react';
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

const FoodScreen = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [Quantity, setQuantity] = useState('');
  const [Day, setDay] = useState('');
  const [Meal, setMeal] = useState('Breakfast');
  const [details, setDetails] = useState(null);

  const handleQuantityChange = (text) => {
    setQuantity(text);
  };

  const handleDayChange = (text) => {
    setDay(text);
  };

  const handleMealChange = (value) => {
    setMeal(value);
  };

  const storeArray = async (quantity, meal, day, label) => {
    try {
      const serializedData = await AsyncStorage.getItem('my_array');
      const arrayData = serializedData ? JSON.parse(serializedData) : {};
  
      if (!arrayData[day]) {
        arrayData[day] = {};
      }
      if (!arrayData[day][meal]) {
        arrayData[day][meal] = [];
      }
  
      arrayData[day][meal].push(label + ' ' + quantity);
  
      const updatedData = JSON.stringify(arrayData);
      await AsyncStorage.setItem('my_array', updatedData);
      console.log('Array stored successfully!');
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
                {'\n'}Cal:
                {details.food.nutrients.ENERC_KCAL}
                {'\n'}Fat: {details.food.nutrients.FAT}
                {'\n'}Carbs: {details.food.nutrients.CHOCDF}
                {'\n'}Protein:{details.food.nutrients.PROCNT}
              </Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Quantity"
              onChangeText={handleQuantityChange}
              value={Quantity}
            />
            <TextInput
              style={styles.input}
              placeholder="Day"
              onChangeText={handleDayChange}
              value={Day}
            />
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
                storeArray(Quantity, Meal, Day, details.food.label);
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
                {'\n'}Cal:
                {item.food.nutrients.ENERC_KCAL}
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
