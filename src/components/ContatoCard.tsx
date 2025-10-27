import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Contato } from '../types';

interface ContatoCardProps {
  contato: Contato;
  onPress: () => void;
}

const ContatoCard: React.FC<ContatoCardProps> = ({ contato, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}> 
      <Image
        style={styles.image}
        source={{ uri: contato.imageUrl }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.nome}>{contato.nome}</Text>
        <Text style={styles.telefone}>{contato.telefone}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  telefone: {
    fontSize: 14,
    color: '#777',
  },
});

export default ContatoCard;