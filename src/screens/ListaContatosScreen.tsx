import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Contato } from '../types';
import ContatoCard from '../components/ContatoCard';
import SearchBar from '../components/SearchBar';
import api from '../services/api';
import { Feather } from '@expo/vector-icons';

type ListaScreenProp = NativeStackNavigationProp<RootStackParamList, 'Lista'>;

const ListaContatosScreen: React.FC = () => {
  const navigation = useNavigation<ListaScreenProp>();
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [loading, setLoading] = useState(true);
  const [termoBusca, setTermoBusca] = useState('');

  const carregarContatos = async () => {
    try {
      setLoading(true);
      const response = await api.get('/contatos');
      setContatos(response.data);
    } catch (error) {
      console.error("Erro ao buscar contatos", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarContatos();
    }, [])
  );

  const contatosFiltrados = contatos.filter(contato =>
     contato.nome.toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <SearchBar value={termoBusca} onChangeText={setTermoBusca} />
      
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={contatosFiltrados}
          renderItem={({ item }) => (
            <ContatoCard 
              contato={item} 
              onPress={() => navigation.navigate('Detalhe', { contato: item })} 
            />
          )}
          keyExtractor={item => String(item.id)}
        />
      )}

      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('Formulario')}
      >
        <Feather name="plus" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0' },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#007bff',
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 }
  }
});

export default ListaContatosScreen;