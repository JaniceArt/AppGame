import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { apiClient, setToken } from '../api/apiClient';

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập đủ thông tin');
      return;
    }
    setLoading(true);
    try {
      const res = await apiClient('/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      });
      if (res.token) {
        setToken(res.token, res.user);
        Alert.alert('Thành công', 'Đăng nhập thành công', [
          { text: 'OK', onPress: () => router.push('/') }
        ]);
      }
    } catch (err: any) {
      Alert.alert('Lỗi', err.message || 'Sai tài khoản hoặc mật khẩu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      
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

      <TouchableOpacity style={styles.btn} onPress={handleLogin} disabled={loading}>
        <Text style={styles.btnText}>{loading ? 'Đang xử lý...' : 'Đăng nhập'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#90cdf4', padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '900', marginBottom: 30, textAlign: 'center', color: '#1a202c' },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 15, borderWidth: 2, borderColor: '#2d3748', fontSize: 16, fontWeight: '600' },
  btn: { backgroundColor: '#319795', padding: 15, borderRadius: 8, alignItems: 'center', borderWidth: 2, borderColor: '#2d3748', borderBottomWidth: 4, borderRightWidth: 4 },
  btnText: { color: '#fff', fontWeight: '900', fontSize: 16 }
});
