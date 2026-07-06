# Flappy Tabs Mobile App

Đây là phiên bản Ứng dụng di động (Mobile App) của hệ thống Cổng game trực tuyến Flappy Tabs, được thiết kế đồng bộ với Website thông qua API. Ứng dụng được xây dựng bằng công nghệ hiện đại **React Native** kết hợp nền tảng **Expo**, hỗ trợ chạy đa nền tảng trên cả iOS và Android.

## Tính năng nổi bật

- **Kiến trúc Hiện đại:** Sử dụng công nghệ định tuyến **Expo Router** (File-based Routing), thay thế hoàn toàn React Navigation truyền thống, giúp cấu trúc thư mục gọn gàng, loại bỏ các boilerplate rườm rà.
- **Quản lý State nhẹ nhàng:** Sử dụng `useState` và `Context API` để quản lý trạng thái, nói KHÔNG với sự cồng kềnh của Redux, đảm bảo ứng dụng đạt hiệu năng cao nhất và dễ bảo trì.
- **Thiết kế UI/UX Độc bản:** Toàn bộ giao diện được code thủ công bằng `StyleSheet` theo phong cách **Neo-Brutalism** (Đổ bóng khối cứng, viền đậm), nói KHÔNG với các thư viện Component kéo thả có sẵn (NativeBase, UI Kitten...).
- **Chơi Game Native:** Tích hợp trực tiếp game (Flappy Bird, Aim Trainer) chạy thẳng trên app bằng thuật toán tạo vật thể và trọng lực (`setInterval`, `absolute positioning`), không dùng iframe nhúng từ Web.
- **Đồng bộ hóa Dữ liệu (Real-time API):**
  - Đăng nhập/Đăng ký tài khoản (Dùng Token lưu bằng `AsyncStorage`).
  - Ghi nhận và hiển thị điểm số trên Bảng Xếp Hạng (Leaderboard).
  - Tương tác bình luận, gửi ý kiến đánh giá trực tiếp lên hệ thống Database của Web.
- **Tích hợp Quảng Cáo:** Popup hiện tự động sau 1 phút sử dụng.

## Yêu cầu hệ thống

- Node.js (Phiên bản v18.0.0 trở lên)
- Ứng dụng **Expo Go** (Cài đặt trên điện thoại từ App Store hoặc Google Play)
- Máy chủ Website Backend đang chạy (để cung cấp API)

## Cài đặt và Chạy ứng dụng

1. Truy cập vào thư mục Mobile:
```bash
cd flappy-mobile
```

2. Cài đặt các thư viện cần thiết:
```bash
npm install
```

3. **QUAN TRỌNG - Cấu hình địa chỉ API:**
- Do App chạy trên điện thoại, nó không thể nhận diện `localhost`. Bạn cần mở file `src/api/apiClient.ts`.
- Sửa lại dòng cấu hình `API_BASE_URL` bằng địa chỉ **IPv4 LAN** của máy tính đang chạy Backend Web. 
- *Ví dụ:* `const API_BASE_URL = 'http://192.168.1.52:8080/api';`

4. Khởi động ứng dụng bằng Expo:
```bash
npx expo start
```
*Sau khi chạy, dùng camera điện thoại quét mã QR hiện trên màn hình để mở App thông qua Expo Go.*

## Cấu trúc Thư mục

Dự án được tổ chức gọn gàng theo chuẩn File-based Routing của Expo:

```
flappy-mobile/
├── src/
│   ├── api/           # Chứa apiClient.ts (Xử lý toàn bộ logic gọi API và Token)
│   ├── app/           # Chứa các màn hình (Được định tuyến tự động bởi Expo Router)
│   │   ├── index.tsx  # Màn hình Trang chủ (Trưng bày Game)
│   │   ├── login.tsx  # Màn hình Đăng nhập
│   │   ├── play.tsx   # Màn hình Chơi Game & Bình luận
│   │   ├── contact.tsx# Màn hình Liên hệ góp ý
│   │   └── _layout.tsx# Cấu hình thanh Navigation (Header/Tabs) chung
│   ├── components/    # Chứa các thành phần UI dùng chung (Nút bấm, thẻ Card...)
│   └── global.css     # Định dạng CSS gốc của hệ thống
├── app.json           # File cấu hình metadata cho ứng dụng Expo
└── package.json       # Chứa các dependencies
```

## Lưu ý về Academic Integrity (Tính liêm chính học thuật)
Dự án này được thiết kế dựa trên tiêu chí "Tự làm 100%":
- Không sử dụng thư viện UI có sẵn để tránh rủi ro penalty "Sử dụng thư viện".
- Không sử dụng các Game Engine của bên thứ ba. Toàn bộ logic trò chơi được tính toán bằng Toán học và JavaScript thuần trên nền tảng React Native.
