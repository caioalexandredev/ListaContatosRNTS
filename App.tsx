import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListaContatosScreen from './src/screens/ListaContatosScreen';
import DetalheContatoScreen from './src/screens/DetalheContatoScreen';
import { RootStackParamList } from './src/types';
import FormularioContatoScreen from './src/screens/FormularioContatoScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator initialRouteName="Lista">
        <Stack.Screen 
          name="Lista" 
          component={ListaContatosScreen}
          options={{ title: 'Meus Contatos' }}
        />
        <Stack.Screen 
          name="Detalhe" 
          component={DetalheContatoScreen}
          options={{ title: 'Detalhe do Contato' }}
        />
        <Stack.Screen 
          name="Formulario" 
          component={FormularioContatoScreen}
          options={{ title: 'Formulário de Contato' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}