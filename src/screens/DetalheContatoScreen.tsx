import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, Button, Alert } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import api from '../services/api';

type DetalheRoute = RouteProp<RootStackParamList, 'Detalhe'>;

const DetalheContatoScreen: React.FC = () => {
  const route = useRoute<DetalheRoute>();
  const navigation = useNavigation();
  const { contato } = route.params;

  const handleExcluir = () => {
    Alert.alert("Confirmar", "Apagar este contato?", [
      { text: "Cancelar" },
      {
        text: "Apagar", style: 'destructive',
        onPress: async () => {
          try {
            await api.delete(`/contatos/${contato.id}`);
            navigation.goBack();
          } catch (error) {
            Alert.alert("Erro", "Falha ao excluir.");
          }
        }
      }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={{ uri: contato.imageUrl }} />
      <View style={styles.infoContainer}>
        <Text style={styles.nome}>{contato.nome}</Text>
        <Text style={styles.telefone}>{contato.telefone}</Text>
        <View style={{ marginTop: 30, width: '100%' }}>
          <Button title="Excluir Contato" color="red" onPress={handleExcluir} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 300, resizeMode: 'cover' },
  infoContainer: { padding: 20, alignItems: 'center' },
  nome: { fontSize: 28, fontWeight: 'bold' },
  telefone: { fontSize: 20, color: '#666', marginTop: 10 }
});
export default DetalheContatoScreen;