import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Contato } from '../types';
import ContatoCard from '../components/ContatoCard';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Feather } from '@expo/vector-icons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Lista'>;

const ListaContatosScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [loading, setLoading] = useState(true);
  const { signOut } = useAuth();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={signOut} style={{ marginRight: 10 }}>
          <Feather name="log-out" size={24} color="red" />
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  const carregarContatos = async () => {
    try {
      setLoading(true);
      const response = await api.get('/contatos');
      setContatos(response.data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os contatos");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarContatos();
    }, [])
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={contatos}
          renderItem={({ item }) => (
            <ContatoCard
              contato={item}
              onPress={() => navigation.navigate('Detalhe', { contato: item })}
            />
          )}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={{ paddingBottom: 80 }}
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
    position: 'absolute', right: 20, bottom: 20,
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: '#007bff', alignItems: 'center', justifyContent: 'center',
    elevation: 8
  }
});

export default ListaContatosScreen;