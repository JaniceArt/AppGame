import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { apiClient } from '../api/apiClient';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const GAME_HEIGHT = 400;

export default function PlayScreen() {
  const { id, name } = useLocalSearchParams();
  const router = useRouter();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // Flappy Bird State
  const [birdY, setBirdY] = useState(GAME_HEIGHT / 2);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [pipeX, setPipeX] = useState(SCREEN_WIDTH);
  const [pipeHeight, setPipeHeight] = useState(150);

  // Aim Trainer State
  const [targetX, setTargetX] = useState(SCREEN_WIDTH / 2 - 25);
  const [targetY, setTargetY] = useState(GAME_HEIGHT / 2 - 25);
  const [timeLeft, setTimeLeft] = useState(30);

  const gameLoop = useRef<any>(null);
  const timerLoop = useRef<any>(null);

  // FLAPPY BIRD LOGIC
  const gravity = 1.2;
  const jumpStrength = -12;
  const pipeWidth = 60;
  const gap = 150;
  const birdSize = 30;

  useEffect(() => {
    if (isPlaying && id == '1' && !isGameOver) {
      gameLoop.current = setInterval(() => {
        setBirdY(y => y + birdVelocity);
        setBirdVelocity(v => v + gravity);
        setPipeX(x => {
          if (x < -pipeWidth) {
            setScore(s => s + 1);
            setPipeHeight(Math.floor(Math.random() * (GAME_HEIGHT - gap - 50)) + 50);
            return SCREEN_WIDTH;
          }
          return x - 5;
        });
      }, 30);
    }
    return () => clearInterval(gameLoop.current);
  }, [isPlaying, isGameOver, birdVelocity, id]);

  // Flappy Collision Check
  useEffect(() => {
    if (isPlaying && id == '1' && !isGameOver) {
      const birdRect = { top: birdY, bottom: birdY + birdSize, left: 50, right: 50 + birdSize };
      const pipeRectTop = { top: 0, bottom: pipeHeight, left: pipeX, right: pipeX + pipeWidth };
      const pipeRectBottom = { top: pipeHeight + gap, bottom: GAME_HEIGHT, left: pipeX, right: pipeX + pipeWidth };

      if (birdRect.bottom > GAME_HEIGHT || birdRect.top < 0) {
        handleGameOver();
      }
      if (
        birdRect.right > pipeRectTop.left && birdRect.left < pipeRectTop.right &&
        (birdRect.top < pipeRectTop.bottom || birdRect.bottom > pipeRectBottom.top)
      ) {
        handleGameOver();
      }
    }
  }, [birdY, pipeX, isPlaying, isGameOver, id]);

  const handleFlappyJump = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      setIsGameOver(false);
      setScore(0);
      setBirdY(GAME_HEIGHT / 2);
      setBirdVelocity(jumpStrength);
      setPipeX(SCREEN_WIDTH);
    } else if (!isGameOver) {
      setBirdVelocity(jumpStrength);
    }
  };

  // AIM TRAINER LOGIC
  useEffect(() => {
    if (isPlaying && id == '2' && !isGameOver) {
      timerLoop.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timerLoop.current);
            handleGameOver();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerLoop.current);
  }, [isPlaying, isGameOver, id]);

  const handleAimClick = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      setIsGameOver(false);
      setScore(0);
      setTimeLeft(30);
      moveTarget();
    } else if (!isGameOver) {
      setScore(s => s + 1);
      moveTarget();
    }
  };

  const moveTarget = () => {
    const maxX = SCREEN_WIDTH - 60;
    const maxY = GAME_HEIGHT - 60;
    setTargetX(Math.floor(Math.random() * maxX));
    setTargetY(Math.floor(Math.random() * maxY));
  };

  const handleGameOver = () => {
    setIsGameOver(true);
    setIsPlaying(false);
    clearInterval(gameLoop.current);
    clearInterval(timerLoop.current);
    saveScore();
  };

  const saveScore = async () => {
    try {
      const res = await apiClient('/scores', {
        method: 'POST',
        body: JSON.stringify({ game_id: id, score })
      });
      if (res.rank) {
        Alert.alert('Game Over', `Điểm của bạn: ${score}\nXếp hạng hiện tại: #${res.rank}`);
      }
    } catch (e: any) {
      if (e.message.includes('đăng nhập')) {
        Alert.alert('Game Over', `Điểm của bạn: ${score}\nVui lòng đăng nhập để lưu điểm!`);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <View style={styles.statsBar}>
        <Text style={styles.statText}>Điểm: {score}</Text>
        {id == '2' && <Text style={styles.statText}>Thời gian: {timeLeft}s</Text>}
      </View>

      <TouchableOpacity 
        activeOpacity={1} 
        style={styles.gameArea} 
        onPress={id == '1' ? handleFlappyJump : undefined}
      >
        {!isPlaying && !isGameOver && (
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>Nhấn để bắt đầu</Text>
            {id == '2' && (
              <TouchableOpacity style={[styles.btn, {marginTop: 20}]} onPress={handleAimClick}>
                <Text style={styles.btnText}>Bắt đầu Aim Trainer</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {isGameOver && (
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>GAME OVER</Text>
            <TouchableOpacity style={styles.btn} onPress={() => {
              if (id == '1') handleFlappyJump();
              else handleAimClick();
            }}>
              <Text style={styles.btnText}>Chơi Lại</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, {marginTop: 10, backgroundColor: '#ecc94b'}]} onPress={() => router.back()}>
              <Text style={styles.btnText}>Thoát</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Render Flappy Bird */}
        {id == '1' && (
          <>
            <View style={[styles.bird, { top: birdY }]}><Text style={{fontSize: 24}}>🐥</Text></View>
            <View style={[styles.pipe, { left: pipeX, top: 0, height: pipeHeight }]} />
            <View style={[styles.pipe, { left: pipeX, top: pipeHeight + gap, height: GAME_HEIGHT - pipeHeight - gap }]} />
          </>
        )}

        {/* Render Aim Trainer */}
        {id == '2' && isPlaying && !isGameOver && (
          <TouchableOpacity 
            style={[styles.target, { left: targetX, top: targetY }]} 
            onPress={handleAimClick}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#90cdf4', padding: 16 },
  title: { fontSize: 26, fontWeight: '900', color: '#1a202c', textAlign: 'center', marginBottom: 10 },
  statsBar: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  statText: { fontSize: 18, fontWeight: '900', color: '#2d3748' },
  gameArea: { 
    height: GAME_HEIGHT, 
    backgroundColor: '#cbd5e0', 
    borderWidth: 3, 
    borderColor: '#2d3748', 
    borderRadius: 8, 
    overflow: 'hidden',
    position: 'relative',
    borderBottomWidth: 6,
    borderRightWidth: 6,
  },
  bird: { position: 'absolute', left: 50, width: 30, height: 30, justifyContent: 'center', alignItems: 'center' },
  pipe: { position: 'absolute', width: 60, backgroundColor: '#28a745', borderWidth: 2, borderColor: '#2d3748' },
  target: { position: 'absolute', width: 50, height: 50, backgroundColor: '#e53e3e', borderRadius: 25, borderWidth: 3, borderColor: '#2d3748' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(26,32,44,0.6)', justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  overlayText: { fontSize: 28, fontWeight: '900', color: '#fff', marginBottom: 20 },
  btn: { backgroundColor: '#319795', padding: 12, borderRadius: 8, borderWidth: 2, borderColor: '#2d3748', borderBottomWidth: 4, borderRightWidth: 4 },
  btnText: { color: '#1a202c', fontWeight: '900', fontSize: 16 }
});
