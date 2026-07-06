import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { apiClient } from '../api/apiClient';

export default function ContentScreen() {
  const { id, name } = useLocalSearchParams();
  const router = useRouter();
  const [leaderboard, setLeaderboard] = useState([]);
  const [comments, setComments] = useState([]);
  const [cName, setCName] = useState('');
  const [cEmail, setCEmail] = useState('');
  const [cRating, setCRating] = useState('5');
  const [cContent, setCContent] = useState('');

  const loadData = () => {
    apiClient(`/leaderboard?game_id=${id || 1}`).then(setLeaderboard).catch(() => {});
    apiClient(`/comments?game_id=${id || 1}`).then(setComments).catch(() => {});
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleComment = async () => {
    if (!cName || !cEmail || !cContent) {
      Alert.alert('Lỗi', 'Vui lòng nhập đủ thông tin');
      return;
    }
    try {
      await apiClient('/comments', {
        method: 'POST',
        body: JSON.stringify({
          game_id: id || 1,
          name: cName,
          email: cEmail,
          rating: cRating,
          content: cContent
        })
      });
      Alert.alert('Thành công', 'Đã gửi bình luận');
      setCName('');
      setCEmail('');
      setCContent('');
      loadData(); // reload
    } catch (err: any) {
      Alert.alert('Lỗi', err.message || 'Không thể gửi bình luận');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{name || 'Game'}</Text>
      </View>

      <TouchableOpacity 
        style={[styles.btn, { backgroundColor: '#ecc94b', marginBottom: 20 }]} 
        onPress={() => router.push({ pathname: '/play', params: { id, name } })}
      >
        <Text style={[styles.btnText, { color: '#1a202c', fontSize: 18 }]}>🎮 CHƠI GAME NÀY 🎮</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Bảng xếp hạng</Text>
      <View style={styles.card}>
        {leaderboard.length === 0 ? <Text style={styles.empty}>Chưa có dữ liệu</Text> : null}
        {leaderboard.map((item: any, idx) => (
          <View key={item.id || idx} style={styles.row}>
            <Text style={styles.rank}>#{idx + 1}</Text>
            <Text style={styles.rowName}>{item.name}</Text>
            <Text style={styles.score}>{item.score}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Bình luận & Đánh giá</Text>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Tên" value={cName} onChangeText={setCName} />
        <TextInput style={styles.input} placeholder="Email" value={cEmail} onChangeText={setCEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Điểm đánh giá (1-5)" value={cRating} onChangeText={setCRating} keyboardType="numeric" />
        <TextInput style={[styles.input, { minHeight: 60 }]} placeholder="Nội dung" value={cContent} onChangeText={setCContent} multiline />
        <TouchableOpacity style={styles.btn} onPress={handleComment}>
          <Text style={styles.btnText}>Gửi Bình luận</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.commentList}>
        {comments.map((c: any) => (
          <View key={c.id} style={styles.commentCard}>
            <View style={styles.commentHeader}>
              <Text style={styles.commentName}>{c.senderName}</Text>
              <Text style={styles.commentRating}>⭐ {c.ratingScore}</Text>
            </View>
            <Text style={styles.commentBody}>{c.content}</Text>
          </View>
        ))}
      </View>
      
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#90cdf4', padding: 16 },
  header: { marginBottom: 20, alignItems: 'center' },
  title: { fontSize: 26, fontWeight: '900', color: '#1a202c' },
  sectionTitle: { fontSize: 20, fontWeight: '900', marginBottom: 10, color: '#1a202c' },
  card: { backgroundColor: '#fdf6e3', padding: 15, borderRadius: 8, marginBottom: 20, borderWidth: 2, borderColor: '#2d3748', borderBottomWidth: 5, borderRightWidth: 5 },
  empty: { fontStyle: 'italic', color: '#4a5568', fontWeight: '600' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 2, borderBottomColor: '#cbd5e0' },
  rank: { width: 30, fontWeight: '900', color: '#319795' },
  rowName: { flex: 1, color: '#1a202c', fontWeight: '700' },
  score: { fontWeight: '900', color: '#e53e3e' },
  form: { backgroundColor: '#edf2f7', padding: 15, borderRadius: 8, marginBottom: 20, borderWidth: 2, borderColor: '#2d3748', borderBottomWidth: 5, borderRightWidth: 5 },
  input: { borderWidth: 2, borderColor: '#2d3748', borderRadius: 8, padding: 10, marginBottom: 10, backgroundColor: '#fff', fontWeight: '600' },
  btn: { backgroundColor: '#319795', padding: 12, borderRadius: 8, alignItems: 'center', borderWidth: 2, borderColor: '#2d3748', borderBottomWidth: 4, borderRightWidth: 4 },
  btnText: { color: '#fff', fontWeight: '900' },
  commentList: { marginTop: 10 },
  commentCard: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 10, borderWidth: 2, borderColor: '#2d3748', borderBottomWidth: 4, borderRightWidth: 4 },
  commentHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  commentName: { fontWeight: '900', color: '#1a202c' },
  commentRating: { color: '#ecc94b', fontWeight: '900' },
  commentBody: { color: '#4a5568', marginTop: 5, fontWeight: '600' }
});
