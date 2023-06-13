import React from "react";
import {View, Text, FlatList} from 'react-native';

const MealSection = ({ mealItems}) => {
    return (
        <View>
            <Text>{mealItems.lengh ? 'Meal Items' : 'No Items'}</Text>
            <FlatList
                data={mealItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.name}</Text>
                        <Text>{item.calories} {item.calories.lengh ? 'calories' : 'calorie'}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default MealSection;