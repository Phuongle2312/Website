# Laravel API - Quick Test Guide

## 🚀 Start Server
```bash
php artisan serve
```

## ✅ Quick Test

### Test với cURL:
```powershell
# Test API
curl.exe http://127.0.0.1:8000/api/test

# Register User
curl.exe -X POST http://127.0.0.1:8000/api/register -H "Content-Type: application/json" --data "@test-data.json"

# Get Products
curl.exe http://127.0.0.1:8000/api/products
```

### Test với Script:
```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File test-all-apis.ps1
```

## 📚 Full Documentation
Xem file `API-GUIDE.md` để biết chi tiết đầy đủ về:
- Tất cả các API endpoints
- Validation rules
- Error handling
- Troubleshooting

## 🎯 Available Endpoints

### Authentication
- `POST /api/register` - Đăng ký
- `POST /api/login` - Đăng nhập
- `GET /api/user` - Lấy thông tin user (protected)
- `POST /api/logout` - Đăng xuất (protected)

### Products
- `GET /api/products` - Lấy tất cả sản phẩm
- `GET /api/products/{id}` - Lấy chi tiết sản phẩm
- `GET /api/products/search?query=...` - Tìm kiếm sản phẩm

## 📝 Test Files
- `test-data.json` - Sample data
- `test-all-apis.ps1` - Complete test script
- `API-GUIDE.md` - Full documentation
