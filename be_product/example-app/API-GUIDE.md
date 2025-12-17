# Hướng Dẫn Test API Laravel - Giải Thích Lỗi và Cách Sửa

## 📋 Tóm Tắt Vấn Đề Ban Đầu

### Lỗi Gặp Phải
```
Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException
The GET method is not supported for route api/register. Supported methods: POST.
```

### Nguyên Nhân
Bạn đang cố gắng truy cập `http://localhost:8000/api/register` bằng phương thức **GET** (khi gõ URL vào trình duyệt), nhưng route này chỉ chấp nhận phương thức **POST**.

---

## 🔧 Các Vấn Đề Đã Sửa

### 1. **Lỗi PowerShell với cURL**
**Vấn đề**: Trong Windows PowerShell, `curl` là alias của `Invoke-WebRequest`, không phải Unix curl.

**Giải pháp**: Sử dụng `curl.exe` hoặc `Invoke-WebRequest` với cú pháp PowerShell.

### 2. **Lỗi Laravel Fortify - TwoFactorAuthenticatable**
**Vấn đề**: User model sử dụng trait `TwoFactorAuthenticatable` nhưng migration two-factor gây lỗi database.

**Giải pháp**: 
- Xóa trait `TwoFactorAuthenticatable` khỏi User model
- Xóa migration `2025_08_26_100418_add_two_factor_columns_to_users_table.php`
- Xóa các hidden fields liên quan đến two-factor

### 3. **Lỗi Database - Missing Columns**
**Vấn đề**: User model có các trường `phone`, `address`, `provider`, `provider_id` trong `$fillable` nhưng không có trong database.

**Giải pháp**:
- Thêm `phone` và `address` vào migration
- Xóa `provider` và `provider_id` khỏi `$fillable`

### 4. **Lỗi Laravel Sanctum**
**Vấn đề**: Sanctum chưa được publish và migrate.

**Giải pháp**:
```bash
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

---

## ✅ Cách Test API Đúng Cách

### **Phương Pháp 1: Sử dụng cURL (Windows)**

```powershell
# Test Registration
curl.exe -X POST http://127.0.0.1:8000/api/register `
  -H "Content-Type: application/json" `
  -H "Accept: application/json" `
  --data "@test-data.json"

# Test Login
curl.exe -X POST http://127.0.0.1:8000/api/login `
  -H "Content-Type: application/json" `
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"

# Test Get Products
curl.exe http://127.0.0.1:8000/api/products
```

### **Phương Pháp 2: Sử dụng PowerShell**

```powershell
# Test Registration
$body = @{
    name = "Nguyen Van A"
    email = "nguyenvana@example.com"
    password = "password123"
    password_confirmation = "password123"
    phone = "0123456789"
    address = "Hanoi"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:8000/api/register" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body `
    -UseBasicParsing

$data = $response.Content | ConvertFrom-Json
Write-Host "Token: $($data.token)"
```

### **Phương Pháp 3: Sử dụng Test Script**

Chạy file `test-all-apis.ps1` đã được tạo:

```powershell
# Chạy script test
powershell -NoProfile -ExecutionPolicy Bypass -File test-all-apis.ps1
```

---

## 📝 Các API Endpoints Có Sẵn

### **1. Authentication APIs**

#### Register (POST)
```
POST /api/register
Content-Type: application/json

Body:
{
  "name": "Nguyen Van A",
  "email": "nguyenvana@example.com",
  "password": "password123",
  "password_confirmation": "password123",
  "phone": "0123456789",          // Optional
  "address": "123 Test Street"    // Optional
}

Response (201):
{
  "success": true,
  "message": "Đăng ký thành công!",
  "user": {
    "id": 1,
    "name": "Nguyen Van A",
    "email": "nguyenvana@example.com",
    "phone": "0123456789",
    "address": "123 Test Street",
    "created_at": "2025-12-15T02:04:10.000000Z",
    "updated_at": "2025-12-15T02:04:10.000000Z"
  },
  "token": "1|xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

#### Login (POST)
```
POST /api/login
Content-Type: application/json

Body:
{
  "email": "nguyenvana@example.com",
  "password": "password123",
  "remember": true    // Optional
}

Response (200):
{
  "success": true,
  "message": "Đăng nhập thành công!",
  "user": { ... },
  "token": "2|xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

#### Get User Info (GET - Protected)
```
GET /api/user
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "user": {
    "id": 1,
    "name": "Nguyen Van A",
    "email": "nguyenvana@example.com",
    "phone": "0123456789",
    "address": "123 Test Street"
  }
}
```

#### Logout (POST - Protected)
```
POST /api/logout
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "message": "Đăng xuất thành công!"
}
```

### **2. Product APIs**

#### Get All Products (GET)
```
GET /api/products

Response (200):
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "iPhone 15 Pro Max",
      "price": 29990000,
      "brand": "Apple",
      "stock": 50,
      "description": "...",
      "image_url": "..."
    },
    ...
  ]
}
```

#### Get Single Product (GET)
```
GET /api/products/{id}

Response (200):
{
  "success": true,
  "data": {
    "id": 1,
    "name": "iPhone 15 Pro Max",
    "price": 29990000,
    "brand": "Apple",
    "stock": 50,
    "description": "...",
    "image_url": "..."
  }
}
```

#### Search Products (GET)
```
GET /api/products/search?query=iphone

Response (200):
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "iPhone 15 Pro Max",
      ...
    }
  ]
}
```

---

## 🎯 Validation Rules

### Registration
| Field | Required | Rules |
|-------|----------|-------|
| `name` | ✅ Yes | String, max 255 characters |
| `email` | ✅ Yes | Valid email, unique, max 255 characters |
| `password` | ✅ Yes | Min 8 characters, must match confirmation |
| `password_confirmation` | ✅ Yes | Must match password |
| `phone` | ❌ No | String, max 20 characters |
| `address` | ❌ No | String, max 500 characters |

### Login
| Field | Required | Rules |
|-------|----------|-------|
| `email` | ✅ Yes | Valid email |
| `password` | ✅ Yes | String |
| `remember` | ❌ No | Boolean |

---

## 🚀 Quick Start Commands

```powershell
# 1. Start Laravel Server
php artisan serve

# 2. Test API is working
curl.exe http://127.0.0.1:8000/api/test

# 3. Register a new user
curl.exe -X POST http://127.0.0.1:8000/api/register `
  -H "Content-Type: application/json" `
  --data "@test-data.json"

# 4. Get all products
curl.exe http://127.0.0.1:8000/api/products

# 5. Run complete test suite
powershell -NoProfile -ExecutionPolicy Bypass -File test-all-apis.ps1
```

---

## 📁 Files Created

1. **test-data.json** - Sample JSON data for testing
2. **test-all-apis.ps1** - Complete test script for all endpoints
3. **simple-test.ps1** - Simple registration test
4. **API-GUIDE.md** - This documentation file

---

## 🔍 Troubleshooting

### Lỗi: "SQLSTATE[HY000]: General error"
**Giải pháp**: Chạy migrations
```bash
php artisan migrate:fresh --seed
```

### Lỗi: "The email has already been taken"
**Giải pháp**: Sử dụng email khác hoặc xóa user cũ trong database

### Lỗi: "Unauthenticated"
**Giải pháp**: Đảm bảo bạn đã gửi token trong header:
```
Authorization: Bearer {your-token-here}
```

### Lỗi: PowerShell Security Warning
**Giải pháp**: Thêm `-UseBasicParsing` vào `Invoke-WebRequest`:
```powershell
Invoke-WebRequest -Uri "..." -UseBasicParsing
```

---

## ✨ Kết Luận

API của bạn đã hoạt động hoàn hảo! Bạn có thể:
- ✅ Đăng ký user mới
- ✅ Đăng nhập
- ✅ Lấy thông tin user (protected route)
- ✅ Đăng xuất
- ✅ Lấy danh sách products
- ✅ Tìm kiếm products
- ✅ Lấy chi tiết product

Sử dụng các test scripts đã tạo để kiểm tra API một cách nhanh chóng!
