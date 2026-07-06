import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { apiClient } from '../api/apiClient';

export default function RankingScreen() {
  const [flappyLeaderboard, setFlappyLeaderboard] = useState([]);
  const [aimLeaderboard, setAimLeaderboard] = useState([]);

  useEffect(() => {
    apiClient('/leaderboard?game_id=1').then(setFlappyLeaderboard).catch(() => {});
    apiClient('/leaderboard?game_id=2').then(setAimLeaderboard).catch(() => {});
  }, []);

  const renderTable = (data: any[], title: string) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, { flex: 0.5 }]}>Hạng</Text>
        <Text style={[styles.headerCell, { flex: 2 }]}>Người chơi</Text>
        <Text style={[styles.headerCell, { flex: 1, textAlign: 'right' }]}>Điểm</Text>
      </View>
      {data.length === 0 && <Text style={styles.empty}>Chưa có dữ liệu</Text>}
      {data.map((item, idx) => (
        <View key={item.id} style={styles.row}>
          <Text style={[styles.cell, styles.rank, { flex: 0.5 }]}>#{idx + 1}</Text>
          <Text style={[styles.cell, { flex: 2 }]}>{item.name}</Text>
          <Text style={[styles.cell, styles.score, { flex: 1, textAlign: 'right' }]}>{item.score}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Bảng Xếp Hạng Tổng</Text>
      {renderTable(flappyLeaderboard, '🏆 Flappy Bird')}
      {renderTable(aimLeaderboard, '🎯 Aim Trainer')}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#90cdf4', padding: 16 },
  title: { fontSize: 26, fontWeight: '900', color: '#1a202c', textAlign: 'center', marginBottom: 20 },
  card: { backgroundColor: '#fdf6e3', padding: 15, borderRadius: 8, marginBottom: 20, borderWidth: 2, borderColor: '#2d3748', borderBottomWidth: 5, borderRightWidth: 5 },
  cardTitle: { fontSize: 20, fontWeight: '900', color: '#1a202c', marginBottom: 15 },
  tableHeader: { flexDirection: 'row', borderBottomWidth: 2, borderBottomColor: '#cbd5e0', paddingBottom: 8, marginBottom: 8 },
  headerCell: { fontWeight: '900', color: '#4a5568', fontSize: 16 },
  row: { flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#edf2f7' },
  cell: { fontSize: 16, color: '#1a202c', fontWeight: '700' },
  rank: { color: '#319795', fontWeight: '900' },
  score: { color: '#e53e3e', fontWeight: '900' },
  empty: { fontStyle: 'italic', color: '#718096', marginTop: 10 }
});
