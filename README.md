# Flappy Tabs Mobile App

Ứng dụng di động giải trí đa nền tảng, tích hợp trực tiếp các tựa game được yêu thích và kết nối đồng bộ dữ liệu với hệ thống Flappy Tabs Web Portal.

## Yêu cầu hệ thống

- Hệ điều hành: Windows 10/11, macOS, hoặc Linux
- Môi trường: Node.js (v18.x hoặc mới hơn)
- Thiết bị thử nghiệm: Điện thoại iOS/Android cài đặt sẵn ứng dụng **Expo Go**

## Hướng dẫn cài đặt môi trường

### 1. Cài đặt Node.js và npm
1. Truy cập [https://nodejs.org/](https://nodejs.org/)
2. Tải và cài đặt phiên bản LTS mới nhất.
3. Kiểm tra cài đặt:
   ```bash
   node --version
   npm --version
   ```

### 2. Cài đặt thiết bị thử nghiệm (Điện thoại)
- Truy cập App Store (iOS) hoặc Google Play Store (Android).
- Tìm và cài đặt ứng dụng **Expo Go**.
- Đảm bảo điện thoại và máy tính của bạn đang kết nối chung một mạng Wi-Fi.

## Hướng dẫn chạy ứng dụng

### 1. Cài đặt thư viện (Dependencies)
Mở terminal tại thư mục gốc của dự án Mobile và chạy lệnh:
```bash
npm install
```

### 2. Cấu hình kết nối API
Để App trên điện thoại có thể giao tiếp với Backend trên máy tính, bạn cần cấu hình lại IP:
1. Mở terminal (CMD/PowerShell), gõ lệnh `ipconfig` (Windows) hoặc `ifconfig` (macOS) để xem địa chỉ IPv4 LAN của máy tính.
2. Mở file `src/api/apiClient.ts`.
3. Thay đổi giá trị biến `API_BASE_URL` bằng địa chỉ IP của bạn. 
   *(Ví dụ: `http://192.168.1.52:8080/api`)*

### 3. Khởi động ứng dụng
```bash
npx expo start
```
- Trên màn hình Terminal sẽ hiện ra một mã QR.
- Mở ứng dụng **Expo Go** trên điện thoại và chọn tính năng quét mã (Scan QR Code).
- Quét mã trên màn hình máy tính để tải và chạy ứng dụng.

## Công nghệ sử dụng

- **React Native**: Khung ứng dụng phát triển đa nền tảng.
- **Expo & Expo Router**: Công cụ tối ưu hóa và kiến trúc định tuyến File-based Routing.
- **AsyncStorage**: Quản lý lưu trữ phiên đăng nhập cục bộ.
- **Tailwind/Vanilla CSS (Metro Bundler)**: Định dạng giao diện theo phong cách Neo-Brutalism.

## Cấu trúc thư mục

```
flappy-mobile/
├── src/
│   ├── api/                # Cấu hình và quản lý các hàm gọi API
│   │   └── apiClient.ts    
│   ├── app/                # Hệ thống định tuyến màn hình (Expo Router)
│   │   ├── (tabs)/         # Các màn hình chứa thanh điều hướng dưới (Bottom Tabs)
│   │   ├── _layout.tsx     # Cấu trúc layout chung
│   │   ├── index.tsx       # Màn hình chính
│   │   ├── login.tsx       # Màn hình đăng nhập/đăng ký
│   │   ├── play.tsx        # Màn hình chơi game
│   │   └── contact.tsx     # Màn hình liên hệ
│   ├── components/         # Các thành phần giao diện tái sử dụng (UI Components)
│   ├── constants/          # Khai báo các hằng số hệ thống
│   ├── hooks/              # Custom React Hooks
│   └── global.css          # Định dạng CSS tổng thể
├── app.json                # Cấu hình siêu dữ liệu của ứng dụng Expo
└── package.json            # Quản lý thư viện
```

## Tính năng chính

- Giao diện trực quan, phong cách thiết kế Neo-Brutalism hiện đại.
- Đăng nhập, đăng ký và lưu phiên hoạt động (Session) an toàn.
- Hệ thống giải trí: Trải nghiệm game tương tác mượt mà bằng engine native.
- Tương tác cộng đồng: Đánh giá sao và gửi bình luận theo thời gian thực.
- Đồng bộ đa nền tảng: Mọi dữ liệu xếp hạng (Leaderboard) được kết nối trực tiếp với Database trung tâm.
- Hệ thống hỗ trợ: Form gửi ý kiến và liên hệ trực tiếp cho nhà phát triển.

## Liên hệ hỗ trợ

Trong quá trình triển khai, nếu hệ thống gặp lỗi kết nối API (`Network Error`), vui lòng kiểm tra lại cấu hình Tường lửa (Firewall) trên máy tính hoặc khởi động lại modem mạng để đồng bộ địa chỉ IP LAN.
