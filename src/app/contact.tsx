import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { apiClient } from '../api/apiClient';

export default function ContactScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!name || !email || !message) {
      Alert.alert('Lỗi', 'Vui lòng nhập đủ thông tin');
      return;
    }
    setLoading(true);
    try {
      await apiClient('/contact', {
        method: 'POST',
        body: JSON.stringify({ name, email, message })
      });
      Alert.alert('Thành công', 'Cảm ơn bạn đã liên hệ!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (err: any) {
      Alert.alert('Lỗi', err.message || 'Lỗi hệ thống');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Gửi ý kiến / Liên hệ</Text>
      
      <Text style={styles.label}>Tên của bạn</Text>
      <TextInput 
        style={styles.input}
        placeholder="Nhập tên"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput 
        style={styles.input}
        placeholder="Nhập email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Tin nhắn</Text>
      <TextInput 
        style={[styles.input, styles.textArea]}
        placeholder="Nội dung ý kiến..."
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.btn} onPress={handleSend} disabled={loading}>
        <Text style={styles.btnText}>{loading ? 'Đang gửi...' : 'Gửi liên hệ'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#90cdf4', padding: 20 },
  title: { fontSize: 24, fontWeight: '900', marginBottom: 20, textAlign: 'center', color: '#1a202c' },
  label: { fontSize: 16, fontWeight: '800', color: '#1a202c', marginBottom: 5 },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 15, borderWidth: 2, borderColor: '#2d3748', fontSize: 16, fontWeight: '600' },
  textArea: { minHeight: 100, textAlignVertical: 'top' },
  btn: { backgroundColor: '#ecc94b', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10, borderWidth: 2, borderColor: '#2d3748', borderBottomWidth: 4, borderRightWidth: 4 },
  btnText: { color: '#1a202c', fontWeight: '900', fontSize: 16 }
});
