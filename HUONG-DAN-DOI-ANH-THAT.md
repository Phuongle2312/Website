# 📱 HƯỚNG DẪN SỬ DỤNG ẢNH ĐIỆN THOẠI THẬT

## 🎯 Vấn Đề
Hiện tại đang dùng ảnh placeholder random (cảnh thiên nhiên, trái cây...) thay vì ảnh điện thoại thật.

## ✅ GIẢI PHÁP: Dùng Ảnh Local

### BƯỚC 1: Tạo Thư Mục Lưu Ảnh

```powershell
# Tạo thư mục trong frontend
cd e:\Github\Website\fe_product\public
mkdir images
cd images
mkdir products
```

Kết quả: `e:\Github\Website\fe_product\public\images\products\`

---

### BƯỚC 2: Tải Ảnh Điện Thoại

**Tôi sẽ tạo script tự động tải ảnh cho bạn:**

Tạo file `download-images.ps1`:

```powershell
# Download product images
$outputDir = "e:\Github\Website\fe_product\public\images\products"

# Tạo thư mục nếu chưa có
if (!(Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force
}

# Danh sách ảnh điện thoại từ nguồn miễn phí
$images = @(
    @{url="https://cdn.pixabay.com/photo/2014/08/05/10/30/iphone-410324_960_720.jpg"; name="p1.jpg"},
    @{url="https://cdn.pixabay.com/photo/2016/11/29/12/30/phone-1869510_960_720.jpg"; name="p2.jpg"},
    @{url="https://cdn.pixabay.com/photo/2017/01/31/21/23/smartphone-2025892_960_720.png"; name="p3.jpg"},
    @{url="https://cdn.pixabay.com/photo/2016/11/29/08/41/apple-1868496_960_720.jpg"; name="p4.jpg"},
    @{url="https://cdn.pixabay.com/photo/2017/06/20/22/14/man-2425121_960_720.jpg"; name="p5.jpg"},
    @{url="https://cdn.pixabay.com/photo/2016/03/27/19/43/samsung-1283938_960_720.jpg"; name="p6.jpg"},
    @{url="https://cdn.pixabay.com/photo/2014/10/23/18/05/google-500989_960_720.jpg"; name="p7.jpg"}
)

foreach ($img in $images) {
    $output = Join-Path $outputDir $img.name
    Write-Host "Downloading $($img.name)..." -ForegroundColor Yellow
    try {
        Invoke-WebRequest -Uri $img.url -OutFile $output
        Write-Host "✓ Downloaded $($img.name)" -ForegroundColor Green
    } catch {
        Write-Host "✗ Failed to download $($img.name)" -ForegroundColor Red
    }
}

Write-Host "`nDone! Images saved to: $outputDir" -ForegroundColor Cyan
```

**Chạy script:**
```powershell
cd e:\Github\Website
.\download-images.ps1
```

---

### BƯỚC 3: Cập Nhật ProductSeeder

Sửa file: `e:\Github\Website\be_product\example-app\database\seeders\ProductSeeder.php`

**Đổi phần $images thành:**

```php
// Danh sách ảnh local
$images = [
    '/images/products/p1.jpg',  // iPhone
    '/images/products/p2.jpg',  // Samsung
    '/images/products/p3.jpg',  // Xiaomi
    '/images/products/p4.jpg',  // Oppo
    '/images/products/p5.jpg',  // Vivo
    '/images/products/p6.jpg',  // Realme
    '/images/products/p7.jpg',  // Google Pixel
];
```

---

### BƯỚC 4: Chạy Lại Seeder

```powershell
cd e:\Github\Website\be_product\example-app
php artisan db:seed --class=ProductSeeder
```

---

### BƯỚC 5: Reload Frontend

```
Ctrl + Shift + R
```

Hoặc:
```
Ctrl + F5
```

---

## 🎨 TÙY CHỌN: Tải Ảnh Thủ Công

Nếu muốn tự chọn ảnh:

### 1. Tìm Ảnh Điện Thoại
Nguồn miễn phí:
- **Pixabay**: https://pixabay.com/images/search/smartphone/
- **Pexels**: https://www.pexels.com/search/phone/
- **Unsplash**: https://unsplash.com/s/photos/smartphone

### 2. Tải 7 Ảnh
Tải về và đặt tên:
- `p1.jpg` - iPhone 16 Pro Max
- `p2.jpg` - Samsung Galaxy S24 Ultra
- `p3.jpg` - Xiaomi 14T Pro
- `p4.jpg` - Oppo Find X7 Ultra
- `p5.jpg` - Vivo V40 Pro 5G
- `p6.jpg` - Realme 13 Pro+ 5G
- `p7.jpg` - Google Pixel 8 Pro

### 3. Copy Vào Thư Mục
```
e:\Github\Website\fe_product\public\images\products\
```

### 4. Làm theo BƯỚC 3, 4, 5 ở trên

---

## 🔧 CÁCH NHANH NHẤT (Khuyến nghị)

Tôi sẽ tạo script tự động cho bạn ngay:

**File:** `e:\Github\Website\setup-product-images.ps1`

Chạy 1 lệnh duy nhất:
```powershell
cd e:\Github\Website
.\setup-product-images.ps1
```

Script sẽ:
1. ✅ Tạo thư mục
2. ✅ Tải 7 ảnh điện thoại
3. ✅ Cập nhật ProductSeeder
4. ✅ Chạy seeder
5. ✅ Thông báo hoàn thành

---

## ✅ Checklist

- [ ] Tạo thư mục `public/images/products`
- [ ] Tải 7 ảnh điện thoại (p1.jpg đến p7.jpg)
- [ ] Sửa ProductSeeder đổi URL sang `/images/products/pX.jpg`
- [ ] Chạy `php artisan db:seed --class=ProductSeeder`
- [ ] Reload frontend (Ctrl + Shift + R)
- [ ] Kiểm tra 7 ảnh điện thoại hiển thị

---

## 🎯 Bạn Muốn Tôi Làm Gì?

**Chọn 1 trong 2:**

### Option 1: Tôi Tạo Script Tự Động (Nhanh - 2 phút)
Tôi sẽ tạo script tải ảnh và cập nhật tự động. Bạn chỉ cần chạy 1 lệnh.

### Option 2: Bạn Tự Tải Ảnh (Chọn ảnh đẹp hơn)
Tôi hướng dẫn chi tiết, bạn tự chọn ảnh điện thoại yêu thích.

**Bạn chọn Option nào?**
