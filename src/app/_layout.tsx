import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { loadAuth } from '../api/apiClient';

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    loadAuth().then(() => setIsReady(true));
  }, []);

  if (!isReady) return null;

  return (
    <Stack screenOptions={{ 
      headerStyle: { backgroundColor: '#e2e8f0' }, 
      headerTintColor: '#1a202c', 
      headerTitleStyle: { fontWeight: '900' },
      headerShadowVisible: false,
    }}>
      <Stack.Screen name="index" options={{ title: 'Flappy Portal - Màn hình chính' }} />
      <Stack.Screen name="login" options={{ title: 'Đăng nhập' }} />
      <Stack.Screen name="register" options={{ title: 'Đăng ký' }} />
      <Stack.Screen name="content" options={{ title: 'Nội dung Game' }} />
      <Stack.Screen name="play" options={{ title: 'Đang chơi Game' }} />
      <Stack.Screen name="ranking" options={{ title: 'Bảng Xếp Hạng' }} />
      <Stack.Screen name="contact" options={{ title: 'Liên hệ & Ý kiến' }} />
      <Stack.Screen name="admin" options={{ title: 'Trang Quản Trị' }} />
    </Stack>
  );
}
