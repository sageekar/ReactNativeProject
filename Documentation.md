# Project Documentation

## Objective

The objective of this project was to create a calorie counting and meal planning application using React Native and Expo. This application allows users to set their health goals, choose foods from a food database to track their calorie intake, and plan their meals accordingly.

## Application Architecture

The application is structured around several main files and folders:

- `App.js` : This is the entry point of the application. This file initializes the application's navigator and defines the routes to the different screens.

- `assets` : This folder contains the static resources used in the application, such as images and icons.

- `MealContext.js` : CThis file defines the application's context for managing the meal state. It provides functions for adding and removing foods from the meal plan, and for calculating the total calories.

- `screens` : This folder contains the application's screen components. Each file corresponds to a different screen in the application:
  - `FoodScreen.js` : This screen allows users to search for foods in a database and display their nutritional information.

  - `HealthScreen.js` : This screen allows users to set their health goals and calculates the recommended daily calorie intake based on these goals.

  - `MealScreen.js` : This screen allows users to plan their meals for the week and display a summary of planned meals as well as the total calories.

  - `MealItem.js` : This component is used to display an individual meal item in the meal planning screen.

- `node_modules` : This folder contains all the project dependencies installed via npm.

- `package.json` and `package-lock.json` : These files contain the project's metadata and the list of project dependencies.

## Successful Features

All required features have been successfully implemented. Users can set their health goals, search for foods in a database, see their nutritional information, plan their meals, and see a summary of their meals and the total calories.

## Fonctionnalités non réussies

All required features have been implemented.

## Roadmap

### Week 1: June 7 - June 13

#### june 7 
- Creation of the GitHub repository and initialization of the React Native project with Expo.

#### june 9 
- Start of the development of the "Health goals" module with the setup of the form for user information input.

#### june 10 
- Start of the development of the "Food Database" module with the creation of the search interface.

#### june 11 
- Finalization of the "Food Database" module with the addition of the food selection feature for meal planning.

#### june 13 
- Addition of data persistence with AsyncStorage.

### Week 2 : june 14  - june 20 

#### june 14 
- Start of the development of the "Meal Planning" module.

#### june 16 
- Finalisation du module "Meal Planning" avec l'ajout de la fonctionnalité d'ajout et de suppression des aliments dans le plan de repas.

#### 18 juin
- Finalization of the CSS style for the "Health goals" page.

#### 19 juin
- Writing of the README.md file.

### Next Steps

Although the project is finished for now, there are always improvements and additional features that we could add in the future:

- Improvement of the user interface with animations and transitions.

- Addition of a weight tracking feature to allow users to track their progress.

- Integration with other nutrition APIs to get more detailed information about foods.

- Addition of a reminders feature to help users stick to their meal plan.

## Screenshots

(Insert application screenshots here)

## Challenges Encountered

During the development of the application we encountered some difficulties. These included understanding what was technically required of us, managing state in React Native, integrating with the nutrition API, and creating an intuitive and responsive user interface.

Finally, it was quite frustrating to have such an interesting subject but little time to devote to it because of the multiple simultaneous projects.