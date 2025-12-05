import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, Button, Alert } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import api from '../services/api';

type DetalheScreenRouteProp = RouteProp<RootStackParamList, 'Detalhe'>;

const DetalheContatoScreen: React.FC = () => {
  const route = useRoute<DetalheScreenRouteProp>();
  const navigation = useNavigation();
  const { contato } = route.params;

  const handleExcluir = () => {
    Alert.alert(
      "Confirmar",
      "Deseja apagar este contato?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Apagar", 
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete(`/contatos/${contato.id}`);
              navigation.goBack();
            } catch (error) {
              Alert.alert("Erro", "Não foi possível excluir");
            }
          } 
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={{ uri: contato.imageUrl }} />
      <View style={styles.infoContainer}>
        <Text style={styles.nome}>{contato.nome}</Text>
        <Text style={styles.telefone}>{contato.telefone}</Text>
        
        <View style={styles.buttonContainer}>
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
  nome: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  telefone: { fontSize: 20, color: '#666', marginTop: 10, marginBottom: 30 },
  buttonContainer: { width: '100%', paddingHorizontal: 20 }
});

export default DetalheContatoScreen;