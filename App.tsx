import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';

import LoginScreen from './src/screens/LoginScreen';
import ListaContatosScreen from './src/screens/ListaContatosScreen';
import DetalheContatoScreen from './src/screens/DetalheContatoScreen';
import FormularioContatoScreen from './src/screens/FormularioContatoScreen';
import { RootStackParamList } from './src/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Rotas = () => {
  const { signed, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {signed ? (
        <>
          <Stack.Screen name="Lista" component={ListaContatosScreen} options={{ title: 'Meus Contatos' }} />
          <Stack.Screen name="Detalhe" component={DetalheContatoScreen} />
          <Stack.Screen name="Formulario" component={FormularioContatoScreen} options={{ title: 'Novo Contato' }} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Rotas />
      </AuthProvider>
    </NavigationContainer>
  );
}