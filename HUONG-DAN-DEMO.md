# 🎯 HƯỚNG DẪN DEMO DỰ ÁN CHO THUYẾT TRÌNH

## 📋 Mục Lục
1. [Chuẩn Bị Trước Khi Demo](#chuẩn-bị-trước-khi-demo)
2. [Khởi Động Backend (Laravel)](#khởi-động-backend-laravel)
3. [Khởi Động Frontend (React)](#khởi-động-frontend-react)
4. [Kịch Bản Demo](#kịch-bản-demo)
5. [Xử Lý Sự Cố](#xử-lý-sự-cố)

---

## 🔧 Chuẩn Bị Trước Khi Demo

### Checklist Trước Buổi Thuyết Trình
- [ ] Kiểm tra SQL Server đã chạy
- [ ] Kiểm tra database đã có dữ liệu mẫu
- [ ] Test backend API hoạt động
- [ ] Test frontend kết nối được backend
- [ ] Chuẩn bị trình duyệt (Chrome/Edge) ở chế độ toàn màn hình
- [ ] Đóng các ứng dụng không cần thiết
- [ ] Kiểm tra kết nối internet (nếu cần)

### Yêu Cầu Hệ Thống
- ✅ PHP >= 8.1
- ✅ Composer
- ✅ Node.js >= 14
- ✅ SQL Server
- ✅ Git Bash hoặc PowerShell

---

## 🚀 Khởi Động Backend (Laravel)

### Bước 1: Mở Terminal Backend
```powershell
# Di chuyển vào thư mục backend
cd e:\Github\Website\be_product\example-app
```

### Bước 2: Kiểm tra Database
```powershell
# Chạy script kiểm tra nhanh
.\simple-test.ps1
```

> [!TIP]
> Nếu database chưa có dữ liệu, chạy lệnh seed:
> ```powershell
> php artisan db:seed
> ```

### Bước 3: Khởi Động Laravel Server
```powershell
# Khởi động server tại cổng 8000
php artisan serve
```

> [!IMPORTANT]
> **Backend sẽ chạy tại:** `http://localhost:8000`
> 
> Giữ terminal này mở trong suốt buổi demo!

### Bước 4: Kiểm Tra API (Terminal Mới)
```powershell
# Mở terminal mới và test API
cd e:\Github\Website\be_product\example-app
.\test-all-apis.ps1
```

✅ **Kết quả mong đợi:** Tất cả API trả về status 200 hoặc dữ liệu hợp lệ

---

## 💻 Khởi Động Frontend (React)

### Bước 1: Mở Terminal Frontend
```powershell
# Mở terminal mới
cd e:\Github\Website\fe_product
```

### Bước 2: Cài Đặt Dependencies (Nếu Chưa)
```powershell
# Chỉ chạy lần đầu hoặc khi có thay đổi package
npm install
```

### Bước 3: Khởi Động React App
```powershell
# Khởi động development server
npm start
```

> [!IMPORTANT]
> **Frontend sẽ tự động mở tại:** `http://localhost:3000`
> 
> Giữ terminal này mở trong suốt buổi demo!

### Bước 4: Kiểm Tra Kết Nối
- ✅ Trang web tự động mở trong trình duyệt
- ✅ Không có lỗi trong Console (F12)
- ✅ Dữ liệu sản phẩm hiển thị từ backend

---

## 🎬 Kịch Bản Demo

### Demo 1: Tổng Quan Hệ Thống (2-3 phút)

#### 1. Giới Thiệu Kiến Trúc
```
📱 Frontend (React)          🔄 API          🗄️ Backend (Laravel + SQL Server)
   localhost:3000      ←→  REST API  ←→      localhost:8000
```

**Nói:** 
> "Dự án của chúng em sử dụng kiến trúc tách biệt Frontend-Backend. Frontend là React chạy trên cổng 3000, Backend là Laravel kết nối SQL Server chạy trên cổng 8000, giao tiếp qua REST API."

#### 2. Mở Cả Hai Terminal
- **Terminal 1 (Bên trái):** Backend đang chạy
- **Terminal 2 (Bên phải):** Frontend đang chạy

**Nói:**
> "Như các thầy cô thấy, em đang chạy đồng thời cả backend và frontend. Mỗi request từ giao diện sẽ gọi API đến server Laravel."

---

### Demo 2: Chức Năng Xác Thực (5 phút)

#### 1. Đăng Ký Tài Khoản Mới
**Các bước:**
1. Click nút "Đăng ký" / "Register"
2. Điền thông tin:
   - Tên: `Demo User`
   - Email: `demo@example.com`
   - Mật khẩu: `password123`
3. Click "Đăng ký"

**Nói:**
> "Em sẽ demo chức năng đăng ký. Khi người dùng điền form, React sẽ gửi POST request đến API `/api/register` của Laravel."

**Mở DevTools (F12) → Network tab** để show request/response

#### 2. Đăng Nhập
**Các bước:**
1. Click "Đăng nhập" / "Login"
2. Nhập email và password vừa tạo
3. Click "Đăng nhập"

**Nói:**
> "Sau khi đăng nhập thành công, Laravel Sanctum sẽ trả về token. Frontend lưu token này và gửi kèm trong mọi request tiếp theo."

**Show trong DevTools:**
- Request Headers có `Authorization: Bearer {token}`
- Response trả về user data

#### 3. Đăng Xuất
**Nói:**
> "Khi đăng xuất, token sẽ bị xóa khỏi localStorage và session kết thúc."

---

### Demo 3: Quản Lý Sản Phẩm (5 phút)

#### 1. Xem Danh Sách Sản Phẩm
**Nói:**
> "Trang chủ hiển thị danh sách sản phẩm từ database SQL Server thông qua API `/api/products`."

**Show trong DevTools:**
- Network tab: GET request đến `/api/products`
- Response: JSON array chứa products

#### 2. Tìm Kiếm Sản Phẩm
**Các bước:**
1. Nhập từ khóa vào ô tìm kiếm (ví dụ: "iPhone")
2. Xem kết quả lọc

**Nói:**
> "Chức năng tìm kiếm gọi API `/api/products/search?q=iPhone` và hiển thị kết quả real-time."

#### 3. Xem Chi Tiết Sản Phẩm
**Các bước:**
1. Click vào một sản phẩm
2. Xem trang chi tiết

**Nói:**
> "Trang chi tiết gọi API `/api/products/{id}` để lấy thông tin đầy đủ của sản phẩm."

---

### Demo 4: Giỏ Hàng & Đặt Hàng (5 phút)

#### 1. Thêm Sản Phẩm Vào Giỏ
**Các bước:**
1. Click "Thêm vào giỏ hàng"
2. Xem notification thành công
3. Click icon giỏ hàng

**Nói:**
> "Khi thêm sản phẩm, frontend gọi API POST `/api/cart` với product_id và quantity. Backend lưu vào database."

#### 2. Cập Nhật Số Lượng
**Các bước:**
1. Thay đổi số lượng sản phẩm
2. Xem tổng tiền tự động cập nhật

**Nói:**
> "Mỗi lần thay đổi số lượng, gọi API PUT `/api/cart/{id}` để cập nhật database."

#### 3. Đặt Hàng
**Các bước:**
1. Click "Thanh toán"
2. Điền thông tin giao hàng
3. Xác nhận đơn hàng

**Nói:**
> "Khi đặt hàng, Laravel sẽ tạo order mới, cập nhật trạng thái cart, và có thể gửi email xác nhận (nếu cấu hình)."

---

### Demo 5: Backend API Testing (3 phút)

#### 1. Show API Documentation
**Các bước:**
1. Mở file `API-GUIDE.md` trong backend
2. Giải thích các endpoint chính

**Nói:**
> "Em đã tài liệu hóa tất cả API endpoints. Mỗi API đều có mô tả rõ ràng về request/response."

#### 2. Test API Bằng Script
```powershell
# Chạy trong terminal backend
.\test-all-apis.ps1
```

**Nói:**
> "Em có viết script PowerShell để test tất cả API tự động. Điều này giúp đảm bảo backend hoạt động đúng trước khi frontend sử dụng."

**Show kết quả:**
- ✅ Các API trả về status code đúng
- ✅ Dữ liệu trả về đúng format

---

### Demo 6: Database & Models (2 phút)

#### 1. Show Database Structure
**Nói:**
> "Em sử dụng SQL Server làm database. Có các bảng chính: users, products, categories, cart, orders, reviews."

**Có thể show:**
- SQL Server Management Studio (nếu đã mở sẵn)
- Hoặc chạy query trong terminal:
```powershell
php artisan tinker
# Trong tinker:
DB::table('products')->count()
DB::table('users')->count()
```

#### 2. Show Laravel Models & Relationships
**Nói:**
> "Laravel Eloquent ORM giúp em làm việc với database dễ dàng. Các model có relationships như User hasMany Orders, Product belongsTo Category."

---

## 🎯 Tips Thuyết Trình

### Trước Khi Bắt Đầu
1. **Mở sẵn 3 cửa sổ:**
   - Terminal Backend (bên trái)
   - Terminal Frontend (giữa)
   - Browser (bên phải hoặc toàn màn hình)

2. **Chuẩn bị dữ liệu:**
   - Có sẵn 1-2 tài khoản test
   - Database có đủ sản phẩm mẫu
   - Giỏ hàng trống để demo từ đầu

3. **DevTools:**
   - Mở F12 sẵn ở tab Network
   - Zoom chữ lớn để dễ nhìn (Ctrl + Plus)

### Trong Khi Demo
- ✅ Nói chậm, rõ ràng
- ✅ Giải thích TRƯỚC khi click
- ✅ Show cả request/response trong DevTools
- ✅ Nhấn mạnh công nghệ sử dụng (React, Laravel, SQL Server)
- ✅ Đề cập đến security (Sanctum authentication, validation)

### Câu Hỏi Thường Gặp

**Q: Tại sao tách Frontend và Backend?**
> "Em tách để dễ bảo trì, scale, và có thể tái sử dụng API cho mobile app sau này."

**Q: Xử lý lỗi như thế nào?**
> "Frontend có try-catch và hiển thị toast notification. Backend validate input và trả về error message rõ ràng."

**Q: Bảo mật ra sao?**
> "Em dùng Laravel Sanctum cho authentication, CORS để kiểm soát origin, và validate tất cả input từ user."

**Q: Database có index không?**
> "Có ạ, em đã tạo index cho các cột thường xuyên query như product_id, user_id, email."

---

## 🔥 Xử Lý Sự Cố

### Backend Không Khởi Động

**Lỗi: Port 8000 đã được sử dụng**
```powershell
# Dùng port khác
php artisan serve --port=8001
```
⚠️ **Nhớ cập nhật URL trong frontend!**

**Lỗi: Database connection failed**
```powershell
# Kiểm tra SQL Server đã chạy
# Kiểm tra file .env có đúng thông tin database
```

### Frontend Không Khởi Động

**Lỗi: Port 3000 đã được sử dụng**
```
# Chọn Y để dùng port khác (3001)
```

**Lỗi: Module not found**
```powershell
# Xóa node_modules và cài lại
rm -r node_modules
npm install
```

### API Không Hoạt Động

**Lỗi 404: Route not found**
```powershell
# Clear cache
php artisan route:clear
php artisan cache:clear
```

**Lỗi CORS**
```powershell
# Kiểm tra config/cors.php
# Đảm bảo frontend URL được allow
```

### Không Có Dữ Liệu

**Database trống**
```powershell
# Chạy migrations và seeders
php artisan migrate:fresh --seed
```

---

## 📝 Checklist Cuối Cùng

### Trước Buổi Thuyết Trình (1 ngày trước)
- [ ] Test toàn bộ flow từ đầu đến cuối
- [ ] Backup database
- [ ] Chuẩn bị dữ liệu mẫu đẹp
- [ ] Kiểm tra tất cả API
- [ ] Test trên máy thật (không phải VM)

### Sáng Ngày Thuyết Trình (30 phút trước)
- [ ] Khởi động SQL Server
- [ ] Chạy backend: `php artisan serve`
- [ ] Chạy frontend: `npm start`
- [ ] Test 1 lần nữa toàn bộ chức năng
- [ ] Đóng các app không cần thiết
- [ ] Tắt notification Windows
- [ ] Chuẩn bị nước uống 😊

### Trong Buổi Demo
- [ ] Giới thiệu tổng quan kiến trúc
- [ ] Demo đăng ký/đăng nhập
- [ ] Demo xem sản phẩm
- [ ] Demo giỏ hàng & đặt hàng
- [ ] Show API testing
- [ ] Show database structure
- [ ] Trả lời câu hỏi

---

## 🎊 Kết Luận

Chúc bạn thuyết trình thành công! Hãy tự tin và nhớ rằng:
- ✨ Bạn đã build được một hệ thống hoàn chỉnh
- ✨ Frontend-Backend tách biệt rõ ràng
- ✨ Có authentication, validation, error handling
- ✨ Code clean, có documentation

**Good luck! 🚀**

---

## 📞 Script Khởi Động Nhanh

Tạo file `start-demo.ps1` trong thư mục gốc để khởi động nhanh:

```powershell
# File: e:\Github\Website\start-demo.ps1

Write-Host "🚀 Khởi động Demo..." -ForegroundColor Green

# Khởi động Backend
Write-Host "`n📦 Khởi động Backend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd e:\Github\Website\be_product\example-app; php artisan serve"

# Đợi 3 giây
Start-Sleep -Seconds 3

# Khởi động Frontend
Write-Host "`n💻 Khởi động Frontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd e:\Github\Website\fe_product; npm start"

Write-Host "`n✅ Demo đã sẵn sàng!" -ForegroundColor Green
Write-Host "Backend: http://localhost:8000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
```

**Cách sử dụng:**
```powershell
cd e:\Github\Website
.\start-demo.ps1
```
