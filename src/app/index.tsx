import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { apiClient, getUser, setToken } from '../api/apiClient';

export default function HomeScreen() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useFocusEffect(
    useCallback(() => {
      setUser(getUser());
      apiClient('/track_view', { method: 'POST' }).catch(() => {});
    }, [])
  );

  const games = [
    { id: 1, name: 'Flappy Bird', desc: 'Điều khiển chú chim bay qua các ống nước.' },
    { id: 2, name: 'Aim Trainer', desc: 'Luyện phản xạ: Bấm vào mục tiêu để ghi điểm.' }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gamie Portal</Text>
        {user && <Text style={{fontWeight: 'bold', marginTop: 5, color: '#4a5568'}}>Xin chào, {user.name}!</Text>}
      </View>

      <View style={styles.navRow}>
        <TouchableOpacity style={styles.btn} onPress={() => router.push('/ranking')}>
          <Text style={styles.btnText}>Ranking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => router.push('/contact')}>
          <Text style={styles.btnText}>Liên hệ</Text>
        </TouchableOpacity>
        {user?.role === 'admin' && (
          <TouchableOpacity style={styles.btn} onPress={() => router.push('/admin')}>
            <Text style={styles.btnText}>Quản trị</Text>
          </TouchableOpacity>
        )}
        {!user ? (
          <>
            <TouchableOpacity style={styles.btn} onPress={() => router.push('/login')}>
              <Text style={styles.btnText}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => router.push('/register')}>
              <Text style={styles.btnText}>Đăng ký</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.btn} onPress={async () => { await setToken(''); setUser(null); }}>
            <Text style={styles.btnText}>Đăng xuất</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.sectionTitle}>Danh sách Trò chơi</Text>
      {games.map(game => (
        <View key={game.id} style={styles.card}>
          <Text style={styles.cardTitle}>{game.name}</Text>
          <Text style={styles.cardDesc}>{game.desc}</Text>
          <TouchableOpacity 
            style={styles.playBtn} 
            onPress={() => router.push({ pathname: '/content', params: { id: game.id, name: game.name } })}
          >
            <Text style={styles.playBtnText}>Xem chi tiết</Text>
          </TouchableOpacity>
        </View>
      ))}
      
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#90cdf4', padding: 16 },
  header: { alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: '900', color: '#1a202c' },
  navRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 15, marginBottom: 25 },
  btn: { backgroundColor: '#ecc94b', paddingVertical: 12, paddingHorizontal: 22, borderRadius: 8, borderWidth: 2, borderColor: '#2d3748', borderBottomWidth: 4, borderRightWidth: 4, minWidth: 110, alignItems: 'center' },
  btnText: { color: '#1a202c', fontWeight: '900', fontSize: 15 },
  sectionTitle: { fontSize: 20, fontWeight: '900', marginBottom: 10, color: '#1a202c' },
  card: { backgroundColor: '#edf2f7', padding: 16, borderRadius: 8, marginBottom: 15, borderWidth: 2, borderColor: '#2d3748', borderBottomWidth: 5, borderRightWidth: 5 },
  cardTitle: { fontSize: 18, fontWeight: '900', color: '#2d3748' },
  cardDesc: { fontSize: 14, color: '#4a5568', marginVertical: 10, fontWeight: '600' },
  playBtn: { backgroundColor: '#319795', paddingVertical: 10, borderRadius: 8, alignItems: 'center', borderWidth: 2, borderColor: '#2d3748', borderBottomWidth: 4, borderRightWidth: 4 },
  playBtnText: { color: '#fff', fontWeight: '900' }
});
