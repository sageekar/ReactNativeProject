import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const retrieveArray = async () => {
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
  );
}

export default MealScreen;
