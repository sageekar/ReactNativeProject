import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MealItem = ({ mealName, mealItems, onRemoveItem }) => {
  const renderMealItem = (item, index) => (
    <View style={styles.mealItemContainer} key={index}>
      <View style={styles.mealItemDetails}>
        <Text style={styles.mealItemName}>
          {item.name}
          {'  '}
          <Text style={styles.quantityText}>{item.quant}</Text>
        </Text>
        <TouchableOpacity onPress={() => onRemoveItem(index)}>
          <Text style={styles.removeButton}>Remove</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
    </View>
  );
  
  const totalCalories = mealItems.reduce((total, item) => total + item.calories * item.quant, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.mealName}>{mealName}</Text>
      {mealItems.length > 0 ? (
        <>
          {mealItems.map(renderMealItem)}
          <View style={styles.totalCaloriesContainer}>
            <Text style={styles.totalCaloriesText}>Total Calories: {totalCalories}</Text>
          </View>
        </>
      ) : (
        <Text style={styles.noItemsText}>No items</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  mealName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  mealItemContainer: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  mealItemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  mealItemName: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  mealItemCalories: {
    fontSize: 12,
    color: '#888',
  },
  quantityText: {
    fontSize: 12,
    color: '#888',
  },
  separator: {
    height: 1,
    backgroundColor: '#EEE',
  },
  noItemsText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#888',
  },
  totalCaloriesContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
  },
  totalCaloriesText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default MealItem;