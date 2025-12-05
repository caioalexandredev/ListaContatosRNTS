import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../services/api';
import { useNavigation } from '@react-navigation/native';

const FormularioContatoScreen = () => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const navigation = useNavigation();

  const handleSalvar = async () => {
    if (!nome || !telefone) return Alert.alert('Erro', 'Preencha todos os campos');

    try {
      await api.post('/contatos', { nome, telefone });
      Alert.alert('Sucesso', 'Contato salvo!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Telefone" value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />
      <Button title="Salvar Contato" onPress={handleSalvar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 }
});

export default FormularioContatoScreen;