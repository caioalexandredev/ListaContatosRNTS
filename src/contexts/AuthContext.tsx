import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

interface AuthContextData {
  signed: boolean;
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storedToken = await AsyncStorage.getItem('@agenda_token');
      if (storedToken) {
        setSigned(true);
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  async function signIn(email: string, pass: string) {
    const response = await api.post('/auth/login', {
      email: email,
      senha: pass,
    });

    const { token } = response.data;

    await AsyncStorage.setItem('@agenda_token', token);
    setSigned(true);
  }

  async function register(email: string, pass: string) {
    await api.post('/auth/register', {
      email: email,
      senha: pass,
    });
  }

  async function signOut() {
    await AsyncStorage.clear();
    setSigned(false);
  }

  return (
    <AuthContext.Provider value={{ signed, loading, signIn, signOut, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);