import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, Button } from 'react-native';

function HealthScreen() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [healthGoal, setHealthGoal] = useState('weight loss');

  const handleAgeChange = (text) => {
    setAge(text);
  };

  const handleGenderChange = (text) => {
    setGender(text);
  };

  const handleHeightChange = (text) => {
    setHeight(text);
  };

  const handleWeightChange = (text) => {
    setWeight(text);
  };

  const handleActivityLevelChange = (value) => {
    setActivityLevel(value);
  };

  const handleHealthGoalChange = (value) => {
    setHealthGoal(value);
  };

  const handleSubmit = () => {
    const message = `Age: ${age}\nGender: ${gender}\nHeight: ${height}\nWeight: ${weight}\nActivity Level: ${activityLevel}\nHealth Goal: ${healthGoal}`;
    Alert.alert('Form Submitted', message);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Age"
        onChangeText={handleAgeChange}
        value={age}
      />
      <TextInput
        style={styles.input}
        placeholder="Gender"
        onChangeText={handleGenderChange}
        value={gender}
      />
      <TextInput
        style={styles.input}
        placeholder="Height"
        onChangeText={handleHeightChange}
        value={height}
      />
      <TextInput
        style={styles.input}
        placeholder="Weight"
        onChangeText={handleWeightChange}
        value={weight}
      />
       <Text style={styles.label}>Activity Level:</Text>
      <Picker
        selectedValue={activityLevel}
        style={styles.picker}
        onValueChange={handleActivityLevelChange}
      >
        <Picker.Item label="Sedentary" value="sedentary" />
        <Picker.Item label="Light Exercise" value="lightExercise" />
        <Picker.Item label="Moderate Exercise" value="moderateExercise" />
        <Picker.Item label="Heavy Exercise" value="heavyExercise" />
        <Picker.Item label="Extra Exercise" value="extraExercise" />
      </Picker>

      <Text style={styles.label}>Health Goal:</Text>
      <Picker
        selectedValue={healthGoal}
        style={styles.picker}
        onValueChange={handleHealthGoalChange}>
        <Picker.Item label="Weight Loss" value="weightLoss" />
        <Picker.Item label="Weight Maintenance" value="weightMaintenance" />
        <Picker.Item label="Weight Gain" value="weightGain" />
      </Picker>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
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
});

export default HealthScreen;