# Script Tự Động Tải và Cài Đặt Ảnh Điện Thoại
# Tác giả: Auto-generated
# Mục đích: Tải ảnh điện thoại thật và cập nhật database

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "📱 CÀI ĐẶT ẢNH ĐIỆN THOẠI THẬT" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Đường dẫn
$frontendDir = "e:\Github\Website\fe_product"
$imagesDir = "$frontendDir\public\images\products"
$backendDir = "e:\Github\Website\be_product\example-app"
$seederFile = "$backendDir\database\seeders\ProductSeeder.php"

# BƯỚC 1: Tạo thư mục
Write-Host "📁 Bước 1: Tạo thư mục lưu ảnh..." -ForegroundColor Yellow

if (!(Test-Path "$frontendDir\public\images")) {
    New-Item -ItemType Directory -Path "$frontendDir\public\images" -Force | Out-Null
}

if (!(Test-Path $imagesDir)) {
    New-Item -ItemType Directory -Path $imagesDir -Force | Out-Null
    Write-Host "   ✓ Đã tạo: $imagesDir" -ForegroundColor Green
} else {
    Write-Host "   ✓ Thư mục đã tồn tại" -ForegroundColor Green
}

Write-Host ""

# BƯỚC 2: Tải ảnh điện thoại
Write-Host "⬇️  Bước 2: Tải ảnh điện thoại..." -ForegroundColor Yellow

$images = @(
    @{url="https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600"; name="p1.jpg"; desc="iPhone"},
    @{url="https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=600"; name="p2.jpg"; desc="Samsung"},
    @{url="https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600"; name="p3.jpg"; desc="Xiaomi"},
    @{url="https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&w=600"; name="p4.jpg"; desc="Oppo"},
    @{url="https://images.pexels.com/photos/887751/pexels-photo-887751.jpeg?auto=compress&cs=tinysrgb&w=600"; name="p5.jpg"; desc="Vivo"},
    @{url="https://images.pexels.com/photos/1092662/pexels-photo-1092662.jpeg?auto=compress&cs=tinysrgb&w=600"; name="p6.jpg"; desc="Realme"},
    @{url="https://images.pexels.com/photos/1294875/pexels-photo-1294875.jpeg?auto=compress&cs=tinysrgb&w=600"; name="p7.jpg"; desc="Google Pixel"}
)

$downloadCount = 0
foreach ($img in $images) {
    $output = Join-Path $imagesDir $img.name
    Write-Host "   Đang tải $($img.desc) ($($img.name))..." -ForegroundColor Gray
    
    try {
        Invoke-WebRequest -Uri $img.url -OutFile $output -UseBasicParsing
        Write-Host "   ✓ Đã tải: $($img.name)" -ForegroundColor Green
        $downloadCount++
    } catch {
        Write-Host "   ✗ Lỗi tải: $($img.name) - $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "   📊 Đã tải: $downloadCount/7 ảnh" -ForegroundColor Cyan
Write-Host ""

# BƯỚC 3: Cập nhật ProductSeeder
Write-Host "📝 Bước 3: Cập nhật ProductSeeder..." -ForegroundColor Yellow

if (Test-Path $seederFile) {
    $seederContent = Get-Content $seederFile -Raw
    
    # Tìm và thay thế phần $images
    $newImagesArray = @"
        // Danh sách ảnh local - ảnh điện thoại thật
        `$images = [
            '/images/products/p1.jpg',  // iPhone
            '/images/products/p2.jpg',  // Samsung
            '/images/products/p3.jpg',  // Xiaomi
            '/images/products/p4.jpg',  // Oppo
            '/images/products/p5.jpg',  // Vivo
            '/images/products/p6.jpg',  // Realme
            '/images/products/p7.jpg',  // Google Pixel
        ];
"@
    
    # Pattern để tìm phần $images cũ
    $pattern = '(?s)//.*?\$images\s*=\s*\[.*?\];'
    
    if ($seederContent -match $pattern) {
        $seederContent = $seederContent -replace $pattern, $newImagesArray
        Set-Content -Path $seederFile -Value $seederContent -Encoding UTF8
        Write-Host "   ✓ Đã cập nhật ProductSeeder.php" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Không tìm thấy pattern để thay thế. Vui lòng sửa thủ công." -ForegroundColor Yellow
        Write-Host "   Mở file: $seederFile" -ForegroundColor Gray
        Write-Host "   Đổi phần `$images thành:" -ForegroundColor Gray
        Write-Host $newImagesArray -ForegroundColor White
    }
} else {
    Write-Host "   ✗ Không tìm thấy file ProductSeeder.php" -ForegroundColor Red
}

Write-Host ""

# BƯỚC 4: Chạy seeder
Write-Host "🔄 Bước 4: Chạy database seeder..." -ForegroundColor Yellow

try {
    Push-Location $backendDir
    $result = php artisan db:seed --class=ProductSeeder 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✓ Đã seed database thành công" -ForegroundColor Green
    } else {
        Write-Host "   ✗ Lỗi khi seed: $result" -ForegroundColor Red
    }
    Pop-Location
} catch {
    Write-Host "   ✗ Lỗi: $($_.Exception.Message)" -ForegroundColor Red
    Pop-Location
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ HOÀN THÀNH!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📍 Kết quả:" -ForegroundColor Yellow
Write-Host "   - Ảnh đã lưu tại: $imagesDir" -ForegroundColor Cyan
Write-Host "   - Database đã cập nhật" -ForegroundColor Cyan
Write-Host ""
Write-Host "🎯 Bước tiếp theo:" -ForegroundColor Yellow
Write-Host "   1. Mở trình duyệt: http://localhost:3000/products" -ForegroundColor White
Write-Host "   2. Nhấn: Ctrl + Shift + R (Hard Refresh)" -ForegroundColor White
Write-Host "   3. Xem ảnh điện thoại thật hiển thị!" -ForegroundColor White
Write-Host ""
Write-Host "💡 Nếu vẫn thấy ảnh cũ, xóa cache trình duyệt (Ctrl + Shift + Delete)" -ForegroundColor Gray
Write-Host ""
Write-Host "Nhấn phím bất kỳ để đóng..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
