# Script tự động fix database configuration
Write-Host "🔧 Fixing database configuration..." -ForegroundColor Yellow

$envPath = "e:\Github\Website\be_product\example-app\.env"
$dbPath = "e:\Github\Website\be_product\example-app\database\database.sqlite"

# Bước 1: Backup .env
if (Test-Path $envPath) {
    Copy-Item $envPath "$envPath.backup" -Force
    Write-Host "✅ Backed up .env to .env.backup" -ForegroundColor Green
}

# Bước 2: Update .env to use SQLite
Write-Host "📝 Updating .env to use SQLite..." -ForegroundColor Yellow
$envContent = Get-Content $envPath -Raw

# Replace DB_CONNECTION
$envContent = $envContent -replace "DB_CONNECTION=mysql", "DB_CONNECTION=sqlite"

# Comment out MySQL settings
$envContent = $envContent -replace "(?m)^DB_HOST=", "# DB_HOST="
$envContent = $envContent -replace "(?m)^DB_PORT=", "# DB_PORT="
$envContent = $envContent -replace "(?m)^DB_DATABASE=(?!sqlite)", "# DB_DATABASE="
$envContent = $envContent -replace "(?m)^DB_USERNAME=", "# DB_USERNAME="
$envContent = $envContent -replace "(?m)^DB_PASSWORD=", "# DB_PASSWORD="

$envContent | Set-Content $envPath -NoNewline
Write-Host "✅ Updated .env to use SQLite" -ForegroundColor Green

# Bước 3: Tạo database file
Write-Host "📁 Creating database.sqlite..." -ForegroundColor Yellow
if (!(Test-Path $dbPath)) {
    New-Item -ItemType File -Path $dbPath -Force | Out-Null
    Write-Host "✅ Created database.sqlite" -ForegroundColor Green
} else {
    Write-Host "✅ database.sqlite already exists" -ForegroundColor Green
}

# Bước 4: Run migration
Set-Location "e:\Github\Website\be_product\example-app"
Write-Host "`n🗄️  Running migrations and seeders..." -ForegroundColor Yellow
php artisan migrate:fresh --seed

Write-Host "`n🎉 Done! Database is ready!" -ForegroundColor Green
Write-Host "`n📝 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Run: php artisan serve" -ForegroundColor White
Write-Host "   2. Test: http`://localhost`:8000/api/products" -ForegroundColor White
