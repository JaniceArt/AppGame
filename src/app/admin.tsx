import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { apiClient } from '../api/apiClient';

export default function AdminScreen() {
  const [stats, setStats] = useState({ views: 0, users: 0, comments: 0 });
  const [desc, setDesc] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const st = await apiClient('/admin/stats');
      setStats(st);
      const c1 = await apiClient('/comments?game_id=1');
      const c2 = await apiClient('/comments?game_id=2');
      setComments([...c1, ...c2].sort((a, b) => b.id - a.id));
    } catch (e) {
      Alert.alert('Lỗi', 'Không có quyền truy cập Admin');
    }
  };

  const handleUpdateDesc = async () => {
    try {
      await apiClient('/settings', {
        method: 'POST',
        body: JSON.stringify({ key: 'home_desc', val: desc })
      });
      Alert.alert('Thành công', 'Đã lưu mô tả trang chủ');
    } catch (e) {
      Alert.alert('Lỗi', 'Không thể cập nhật');
    }
  };

  const handleDeleteComment = async (id: number) => {
    try {
      await apiClient(`/comments/${id}`, { method: 'DELETE' });
      setComments(c => c.filter((x: any) => x.id !== id));
      Alert.alert('Thành công', 'Đã xoá bình luận');
    } catch (e) {
      Alert.alert('Lỗi', 'Không thể xoá');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Quản trị hệ thống</Text>
      
      <View style={styles.statsRow}>
        <View style={styles.statBox}><Text style={styles.statTitle}>LƯỢT XEM</Text><Text style={styles.statVal}>{stats.views}</Text></View>
        <View style={styles.statBox}><Text style={styles.statTitle}>USERS</Text><Text style={styles.statVal}>{stats.users}</Text></View>
        <View style={styles.statBox}><Text style={styles.statTitle}>COMMENTS</Text><Text style={styles.statVal}>{stats.comments}</Text></View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Cập nhật mô tả trang chủ</Text>
        <TextInput 
          style={styles.input}
          placeholder="Nhập mô tả..."
          value={desc}
          onChangeText={setDesc}
        />
        <TouchableOpacity style={styles.btn} onPress={handleUpdateDesc}>
          <Text style={styles.btnText}>Lưu</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Quản lý bình luận</Text>
      {comments.map((c: any) => (
        <View key={c.id} style={styles.commentCard}>
          <View>
            <Text style={{ fontWeight: '900', color: '#1a202c' }}>{c.senderName} <Text style={{ color: '#718096', fontWeight: 'normal' }}>({c.ratingScore}⭐)</Text></Text>
            <Text style={{ color: '#4a5568', marginTop: 5 }}>{c.content}</Text>
          </View>
          <TouchableOpacity style={styles.delBtn} onPress={() => handleDeleteComment(c.id)}>
            <Text style={styles.delText}>Xoá</Text>
          </TouchableOpacity>
        </View>
      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#90cdf4', padding: 16 },
  title: { fontSize: 26, fontWeight: '900', color: '#1a202c', textAlign: 'center', marginBottom: 20 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statBox: { flex: 1, backgroundColor: '#edf2f7', padding: 10, marginHorizontal: 5, borderRadius: 8, alignItems: 'center', borderWidth: 2, borderColor: '#2d3748', borderBottomWidth: 4, borderRightWidth: 4 },
  statTitle: { fontSize: 12, fontWeight: '800', color: '#4a5568' },
  statVal: { fontSize: 22, fontWeight: '900', color: '#319795' },
  card: { backgroundColor: '#fdf6e3', padding: 15, borderRadius: 8, borderWidth: 2, borderColor: '#2d3748', borderBottomWidth: 5, borderRightWidth: 5 },
  sectionTitle: { fontSize: 18, fontWeight: '900', color: '#1a202c', marginBottom: 10 },
  input: { borderWidth: 2, borderColor: '#2d3748', borderRadius: 8, padding: 10, marginBottom: 10, backgroundColor: '#fff', fontWeight: '600' },
  btn: { backgroundColor: '#ecc94b', padding: 12, borderRadius: 8, alignItems: 'center', borderWidth: 2, borderColor: '#2d3748', borderBottomWidth: 4, borderRightWidth: 4 },
  btnText: { color: '#1a202c', fontWeight: '900' },
  commentCard: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 10, borderWidth: 2, borderColor: '#2d3748', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  delBtn: { backgroundColor: '#e53e3e', padding: 8, borderRadius: 6, borderWidth: 2, borderColor: '#2d3748' },
  delText: { color: '#fff', fontWeight: '900' }
});
