import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isRegistro, setIsRegistro] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, register } = useAuth();

  const handleAuth = async () => {
    if (!email || !senha) return Alert.alert("Atenção", "Preencha todos os campos");

    setIsLoading(true);
    try {
      if (isRegistro) {
        await register(email, senha);
        Alert.alert("Sucesso", "Conta criada! Agora faça login.");
        setIsRegistro(false);
      } else {
        await signIn(email, senha);
      }
    } catch (error) {
      console.log(error);
      if (isRegistro) {
        Alert.alert("Erro", "Falha no cadastro. Email já cadastrado!");
      } else {
        Alert.alert("Erro", "Falha na autenticação. Verifique email/senha.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegistro ? 'Criar Conta' : 'Agenda Login'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title={isRegistro ? "Cadastrar" : "Entrar"} onPress={handleAuth} />
      )}

      <TouchableOpacity onPress={() => setIsRegistro(!isRegistro)} style={{ marginTop: 20 }}>
        <Text style={styles.link}>
          {isRegistro ? "Já tem conta? Faça Login" : "Não tem conta? Cadastre-se"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#333' },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', padding: 15, marginBottom: 15, borderRadius: 8 },
  link: { color: '#007bff', textAlign: 'center', fontSize: 16 }
});

export default LoginScreen;