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
  const [submitDisabled, setSubmitDisabled] = useState(true);

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
    const message = `Age: ${age}\n
    Gender: ${gender}\n
    Height: ${height}\n
    Weight: ${weight}\n
    Activity Level: ${activityLevel}\n
    Health Goal: ${healthGoal}\n
    BMR: ${calculateBMR()}`;
    Alert.alert('Form Submitted', message);
  };

  const validateForm = () => {
    if (age.trim() === '' || gender.trim() === '' || height.trim() === '' || weight.trim() === '') {
      setSubmitDisabled(true);
    } else {
      setSubmitDisabled(false);
    }
  };

  const calculateBMR = () => {
    const weightInKg = parseFloat(weight);
    const heightInCm = parseFloat(height);
    const ageInYears = parseFloat(age);

    let bmr = 0;

    if (gender === 'male' || gender === 'Male') {
      bmr = 88.362 + 13.397 * weightInKg + 4.799 * heightInCm - 5.677 * ageInYears;
    } else if (gender === 'female' || gender === 'Female') {
      bmr = 447.593 + 9.247 * weightInKg + 3.098 * heightInCm - 4.330 * ageInYears;
    }

    return bmr.toFixed(2);
  };

  React.useEffect(() => {
    validateForm();
  }, [age, gender, height, weight]);

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
        onValueChange={handleActivityLevelChange}>
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

      <Button title="Submit" onPress={handleSubmit} disabled={submitDisabled} />
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