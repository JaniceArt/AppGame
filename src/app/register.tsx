import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { apiClient } from '../api/apiClient';

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !username || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập đủ thông tin');
      return;
    }
    setLoading(true);
    try {
      await apiClient('/register', {
        method: 'POST',
        body: JSON.stringify({ name, username, password })
      });
      Alert.alert('Thành công', 'Đăng ký thành công! Hãy đăng nhập.', [
        { text: 'OK', onPress: () => router.push('/login') }
      ]);
    } catch (err: any) {
      Alert.alert('Lỗi', err.message || 'Lỗi đăng ký');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng ký</Text>
      
      <TextInput 
        style={styles.input}
        placeholder="Họ tên"
        value={name}
        onChangeText={setName}
      />
      <TextInput 
        style={styles.input}
        placeholder="Tên đăng nhập"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput 
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.btn} onPress={handleRegister} disabled={loading}>
        <Text style={styles.btnText}>{loading ? 'Đang xử lý...' : 'Đăng ký'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#90cdf4', padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '900', marginBottom: 30, textAlign: 'center', color: '#1a202c' },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 15, borderWidth: 2, borderColor: '#2d3748', fontSize: 16, fontWeight: '600' },
  btn: { backgroundColor: '#ecc94b', padding: 15, borderRadius: 8, alignItems: 'center', borderWidth: 2, borderColor: '#2d3748', borderBottomWidth: 4, borderRightWidth: 4 },
  btnText: { color: '#1a202c', fontWeight: '900', fontSize: 16 }
});
