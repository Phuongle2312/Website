# Script Khởi Động Demo Nhanh
# Tác giả: Auto-generated
# Mục đích: Khởi động cả Backend và Frontend cùng lúc cho buổi demo

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🚀 KHỞI ĐỘNG DEMO DỰ ÁN" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Kiểm tra SQL Server
Write-Host "🔍 Kiểm tra SQL Server..." -ForegroundColor Yellow
$sqlService = Get-Service -Name "MSSQLSERVER" -ErrorAction SilentlyContinue
if ($sqlService -and $sqlService.Status -eq "Running") {
    Write-Host "✅ SQL Server đang chạy" -ForegroundColor Green
} else {
    Write-Host "⚠️  SQL Server chưa chạy. Vui lòng khởi động SQL Server trước!" -ForegroundColor Red
    Write-Host "Nhấn phím bất kỳ để tiếp tục hoặc Ctrl+C để hủy..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

Write-Host ""

# Khởi động Backend
Write-Host "📦 Khởi động Backend (Laravel)..." -ForegroundColor Yellow
Write-Host "   → Cổng: 8000" -ForegroundColor Gray
Write-Host "   → URL: http://localhost:8000" -ForegroundColor Gray

$backendPath = "e:\Github\Website\be_product\example-app"
if (Test-Path $backendPath) {
    Start-Process powershell -ArgumentList @(
        "-NoExit",
        "-Command",
        "cd '$backendPath'; Write-Host '🔥 BACKEND SERVER' -ForegroundColor Green; Write-Host 'Đang chạy tại: http://localhost:8000' -ForegroundColor Cyan; Write-Host ''; php artisan serve"
    )
    Write-Host "✅ Backend terminal đã mở" -ForegroundColor Green
} else {
    Write-Host "❌ Không tìm thấy thư mục backend: $backendPath" -ForegroundColor Red
}

Write-Host ""

# Đợi Backend khởi động
Write-Host "⏳ Đợi Backend khởi động (5 giây)..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Khởi động Frontend
Write-Host "💻 Khởi động Frontend (React)..." -ForegroundColor Yellow
Write-Host "   → Cổng: 3000" -ForegroundColor Gray
Write-Host "   → URL: http://localhost:3000" -ForegroundColor Gray

$frontendPath = "e:\Github\Website\fe_product"
if (Test-Path $frontendPath) {
    Start-Process powershell -ArgumentList @(
        "-NoExit",
        "-Command",
        "cd '$frontendPath'; Write-Host '🔥 FRONTEND SERVER' -ForegroundColor Green; Write-Host 'Đang chạy tại: http://localhost:3000' -ForegroundColor Cyan; Write-Host ''; npm start"
    )
    Write-Host "✅ Frontend terminal đã mở" -ForegroundColor Green
} else {
    Write-Host "❌ Không tìm thấy thư mục frontend: $frontendPath" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ DEMO ĐÃ SẴN SÀNG!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📍 Các địa chỉ quan trọng:" -ForegroundColor Yellow
Write-Host "   Backend API:  http://localhost:8000" -ForegroundColor Cyan
Write-Host "   Frontend App: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Tips:" -ForegroundColor Yellow
Write-Host "   - Mở DevTools (F12) để xem Network requests" -ForegroundColor Gray
Write-Host "   - Backend terminal hiển thị API logs" -ForegroundColor Gray
Write-Host "   - Frontend tự động mở trình duyệt" -ForegroundColor Gray
Write-Host ""
Write-Host "🎯 Sẵn sàng cho buổi thuyết trình!" -ForegroundColor Green
Write-Host ""
Write-Host "Nhấn phím bất kỳ để đóng cửa sổ này..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
