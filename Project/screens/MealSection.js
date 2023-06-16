import React from "react";
import {View, Text, FlatList, StyleSheet} from 'react-native';

const MealSection = ({ mealName, mealItems}) => {
    const renderMealItem = ({ item }) => (
        <View style={styles.mealItemContainer}>
            <View style={styles.mealItemDetails}>
                <Text style = {styles.mealItemName}>{item.name}</Text>
                <Text style={styles.mealItemCalories}>
                    {item.calories} {item.calories === 1 ? 'calorie' : 'calorie'}
                </Text>
            </View>
            <View style={styles.separator} />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.mealName}>{mealName}</Text>
            {mealItems.lengh > 0 ? (
                <FlatList
                    data={mealItems}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderMealItem}
                    contentContainerStyle={styles.flatListContentContainer}
                />
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
    flatListContentContainer: {
        paddingBottom: 10,
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
    menuItemCalories: {
        fontSize: 12,
        color: '#888'
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
});
            

export default MealSection;