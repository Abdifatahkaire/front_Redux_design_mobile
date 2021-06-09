import React from "react";
import Profil from './profil';
import ModifierNom from './ModifierNom';
import ModifierTel from './ModifierTel';


import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function MyStackProfil() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profil" component={Profil} />
      <Stack.Screen name="Modifier Votre Nom" component={ModifierNom} />
      <Stack.Screen name="Modifier Votre Tel" component={ModifierTel} />
    </Stack.Navigator>
  );
}