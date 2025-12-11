# Script tự động setup Laravel Storage cho ảnh sản phẩm
# Chạy trong PowerShell: .\setup-storage.ps1

Write-Host "🚀 Bắt đầu setup Laravel Storage..." -ForegroundColor Green

# Đường dẫn
$backendPath = "e:\Github\Website\be_product\example-app"
$frontendImagePath = "e:\Github\Website\fe_product\public\image"
$storageProductsPath = "$backendPath\storage\app\public\products"

# Bước 1: Tạo symbolic link
Write-Host "`n📁 Bước 1: Tạo symbolic link..." -ForegroundColor Yellow
Set-Location $backendPath
php artisan storage:link

# Bước 2: Tạo thư mục products
Write-Host "`n📁 Bước 2: Tạo thư mục products..." -ForegroundColor Yellow
if (!(Test-Path $storageProductsPath)) {
    New-Item -ItemType Directory -Path $storageProductsPath -Force
    Write-Host "✅ Đã tạo thư mục: $storageProductsPath" -ForegroundColor Green
} else {
    Write-Host "✅ Thư mục đã tồn tại: $storageProductsPath" -ForegroundColor Green
}

# Bước 3: Copy ảnh từ Frontend
Write-Host "`n🖼️  Bước 3: Copy ảnh từ Frontend..." -ForegroundColor Yellow

$imageMappings = @{
    "iphone-17-pro-256-gb.png" = "p1.jpg"
    "samsung-galaxy-s25-ultra-blue-thumbai-600x600.jpg" = "p2.jpg"
    "xiaomi-17-pro-3.PNG" = "p3.jpg"
    "oppo  Find X7 Ultra.jpg" = "p4.jpg"
    "vivoX300 Pro.jpg" = "p5.jpg"
    "realme-GT8Pro.jpg" = "p6.jpg"
    "oppo.jpg" = "p7.jpg"
}

foreach ($source in $imageMappings.Keys) {
    $sourcePath = Join-Path $frontendImagePath $source
    $destPath = Join-Path $storageProductsPath $imageMappings[$source]
    
    if (Test-Path $sourcePath) {
        Copy-Item -Path $sourcePath -Destination $destPath -Force
        Write-Host "✅ Copied: $source → $($imageMappings[$source])" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Không tìm thấy: $source" -ForegroundColor Red
    }
}

# Bước 4: Chạy migration và seed
Write-Host "`n🗄️  Bước 4: Chạy migration và seed..." -ForegroundColor Yellow
php artisan migrate:fresh --seed

# Bước 5: Kiểm tra kết quả
Write-Host "`n✅ Bước 5: Kiểm tra kết quả..." -ForegroundColor Yellow
php artisan tinker --execute="echo 'Total products: ' . App\Models\Product::count();"

Write-Host "`n🎉 Hoàn thành setup!" -ForegroundColor Green
Write-Host "`n📝 Tiếp theo:" -ForegroundColor Cyan
Write-Host "   1. Chạy: php artisan serve" -ForegroundColor White
Write-Host "   2. Test API: http://localhost:8000/api/products" -ForegroundColor White
Write-Host "   3. Test ảnh: http://localhost:8000/storage/products/p1.jpg" -ForegroundColor White
