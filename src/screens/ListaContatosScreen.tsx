import React, { useState, useMemo } from 'react';
import { FlatList, StyleSheet, View, ListRenderItemInfo } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Contato } from '../types';
import ContatoCard from '../components/ContatoCard';
import SearchBar from '../components/SearchBar';

type ListaScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Lista'>;

interface Props {
  navigation: ListaScreenNavigationProp;
}

const DADOS_CONTATOS: Contato[] = [
  { id: '1', nome: 'Ana Silva', telefone: '(11) 98765-4321', imageUrl: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', nome: 'Bruno Martins', telefone: '(21) 91234-5678', imageUrl: 'https://i.pravatar.cc/150?img=7' },
  { id: '3', nome: 'Carla Souza', telefone: '(31) 95555-1234', imageUrl: 'https://i.pravatar.cc/150?img=26' },
  { id: '4', nome: 'Daniel Costa', telefone: '(41) 94444-9876', imageUrl: 'https://i.pravatar.cc/150?img=12' },
  { id: '5', nome: 'Elisa Ferreira', telefone: '(51) 93333-6543', imageUrl: 'https://i.pravatar.cc/150?img=32' },
];

const ListaContatosScreen: React.FC<Props> = ({ navigation }) => {
  const [termoBusca, setTermoBusca] = useState('');

  const contatosFiltrados = useMemo(() => {
    if (!termoBusca) {
      return DADOS_CONTATOS;
    }
    
    return DADOS_CONTATOS.filter(contato =>
      contato.nome.toLowerCase().includes(termoBusca.toLowerCase())
    );
  }, [termoBusca]);

  const handleSelectContato = (contato: Contato) => {
    navigation.navigate('Detalhe', { contato: contato });
  };

  const renderizaItem = ({ item }: ListRenderItemInfo<Contato>) => (
    <ContatoCard 
      contato={item} 
      onPress={() => handleSelectContato(item)} 
    />
  );

  return (
    <View style={styles.container}>
      <SearchBar
        value={termoBusca}
        onChangeText={setTermoBusca}
        placeholder="Buscar contato..."
      />

      <FlatList
        data={contatosFiltrados} 
        renderItem={renderizaItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});

export default ListaContatosScreen;