import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';

type DetalheScreenRouteProp = RouteProp<RootStackParamList, 'Detalhe'>;

const DetalheContatoScreen: React.FC = () => {
  const route = useRoute<DetalheScreenRouteProp>();

  const { contato } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Image 
        style={styles.image} 
        source={{ uri: contato.imageUrl }} 
      />
      
      <View style={styles.infoContainer}>
        <Text style={styles.nome}>{contato.nome}</Text>
        <Text style={styles.telefone}>{contato.telefone}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 20,
    alignItems: 'center',
  },
  nome: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  telefone: {
    fontSize: 20,
    color: '#666',
    marginTop: 10,
  },
});

export default DetalheContatoScreen;