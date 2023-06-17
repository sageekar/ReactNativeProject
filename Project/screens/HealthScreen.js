import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';

import menLogo from '../assets/men_logo.png';
import womenLogo from '../assets/female_logo.png';

function RadioButton({ selected, onPress, children }) {
  return (
    <TouchableOpacity style={styles.radioButton} onPress={onPress}>
      <Icon name={selected ? 'radiobox-marked' : 'radiobox-blank'} size={20} color="green" />
      <Text style={styles.radioButtonText}>{children}</Text>
    </TouchableOpacity>
  );
}

function HealthScreen() {
  const [age, setAge] = useState('');
  const [ageError, setAgeError] = useState(null);
  const [isAgeFocused, setIsAgeFocused] = useState(false);
  
  const [selectedGender, setSelectedGender] = useState(null);
  
  const [height, setHeight] = useState('');
  const [heightError, setHeightError] = useState(null);
  const [isHeightFocused, setIsHeightFocused] = useState(false);

  const [weight, setWeight] = useState('');
  const [weightError, setWeightError] = useState(null);
  const [isWeightFocused, setIsWeightFocused] = useState(false);

  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [healthGoal, setHealthGoal] = useState('weight loss');
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  
  const validateAge = (input) => {
    setAge(input);
    if (input <= 0 || input > 130) {
      setAgeError('Please enter a valid age (1-130)');
    } else {
      setAgeError(null);
    }
  };
 
  const handleGenderSelection = (selectedGender) => {
    setSelectedGender(selectedGender);
  };

  const isMale = selectedGender === 'male';
  const isFemale = selectedGender === 'female';

  const validateHeight = (input) => {
    setHeight(input);
    if (isNaN(input) || input <= 0) {
      setHeightError('Please enter a valid Height (greater than 0)');
    } else {
      setHeightError(null);
    }
  };

  const validateWeight = (input) => {
    setWeight(input);
    if (isNaN(input) || input <= 0) {
      setWeightError('Please enter a valid weight (greater than 0)');
    } else {
      setWeightError(null);
    }
  };

  const handleActivityLevelChange = (value) => {
    setActivityLevel(value);
  };

  const handleHealthGoalChange = (value) => {
    setHealthGoal(value);
  };

  const handleSubmit = () => {
    const message = `Age: ${age}\nGender: ${selectedGender}\nHeight: ${height}\nWeight: ${weight}\nActivity Level: ${activityLevel}\nHealth Goal: ${healthGoal}\nBMR: ${calculateBMR()}`;
    Alert.alert('Form Submitted', message);
    setSubmitted(true);
  };

  const validateForm = () => {
    if (
      age.trim() === '' ||
      selectedGender === null ||
      selectedGender === '' ||
      height.trim() === '' ||
      weight.trim() === ''
    ) {
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

    if (isMale) {
      bmr = 88.362 + 13.397 * weightInKg + 4.799 * heightInCm - 5.677 * ageInYears;
    } else if (isFemale) {
      bmr = 447.593 + 9.247 * weightInKg + 3.098 * heightInCm - 4.33 * ageInYears;
    }

    switch (activityLevel) {
      case 'sedentary':
        bmr *= 1.2;
        break;
      case 'lightExercise':
        bmr *= 1.375;
        break;
      case 'moderateExercise':
        bmr *= 1.55;
        break;
      case 'heavyExercise':
        bmr *= 1.725;
        break;
      case 'extraExercise':
        bmr *= 1.9;
        break;
      default:
        Alert.alert('Activity error');
        break;
    }

    if (healthGoal === 'weightLoss') {
      bmr *= 0.9;
    } else if (healthGoal === 'weightGain') {
      bmr *= 1.1;
    }

    return bmr.toFixed(2);
  };

  React.useEffect(() => {
    validateForm();
  }, [age, selectedGender, height, weight]);

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={[styles.input, ageError ? styles.error : null, isAgeFocused ? styles.focused : null]}
        placeholder="Age"
        onChangeText={validateAge}
        value={age}
        onFocus={() => setIsAgeFocused(true)}
        onBlur={() => setIsAgeFocused(false)}
      />
      {ageError && <Text style={styles.errorMessage}>{ageError}</Text>}

      <View style={styles.genderContainer}>
        <Text style={styles.label}>Gender:</Text>

        <TouchableOpacity style={styles.genderOption} onPress={() => handleGenderSelection('male')}>
          <Image source={menLogo} style={styles.genderLogo} />
          <Icon
            name={selectedGender === 'male' ? 'radiobox-marked' : 'radiobox-blank'}
            size={20}
            color="green"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.genderOption}
          onPress={() => handleGenderSelection('female')}>
          <Image source={womenLogo} style={styles.genderLogo} />
          <Icon
            name={selectedGender === 'female' ? 'radiobox-marked' : 'radiobox-blank'}
            size={20}
            color="green"
          />
        </TouchableOpacity>
      </View>

      <TextInput
        style={[
          styles.input,
          heightError ? styles.error : null,
          isHeightFocused ? styles.focused : null,
        ]}
        onChangeText={validateHeight}
        value={height}
        placeholder="Height"
        keyboardType="numeric"
        onFocus={() => setIsHeightFocused(true)}
        onBlur={() => setIsHeightFocused(false)}
      />
      {weightError && <Text style={styles.errorMessage}>{weightError}</Text>}

      <TextInput
        style={[styles.input, weightError ? styles.error : null, isWeightFocused ? styles.focused : null,]}
        onChangeText={validateWeight}
        value={weight}
        placeholder="Weight"
        keyboardType="numeric"
        onFocus={() => setIsWeightFocused(true)}
        onBlur={() => setIsWeightFocused(false)}
      />
      {weightError && <Text style={styles.errorMessage}>{weightError}</Text>}
      
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

      {submitted && (
        <View>
          <Text style={styles.label}>Your Daily Caloric Intake:</Text>
          <Text style={styles.caloricIntake}>{calculateBMR()} calories</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  focused: {
    height: 60,
    fontSize: 18,
    borderColor: '#026eec',
    borderWidth: 2,
    marginBottom: 10,
    paddingLeft: 10,
  },
  error: {
    borderColor: 'red',
  },
  errorMessage: {
    color: 'red',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
    width: 140,
  },
  radioGroup: {
    marginBottom: 20,
  },
  radioButtonText: {
    marginLeft: 10,
    fontSize: 16,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
  genderOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  genderLogo: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#000000',
    backgroundColor: 'transparent',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default HealthScreen;