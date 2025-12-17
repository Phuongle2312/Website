# ========================================
# Laravel API Complete Test Script
# ========================================

$baseUrl = "http://localhost:8000/api"
$timestamp = Get-Date -Format "HHmmss"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  LARAVEL API TESTING SCRIPT" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# ========================================
# Test 1: Register New User
# ========================================
Write-Host "[TEST 1] User Registration" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Gray

$registerBody = @{
    name = "Test User $timestamp"
    email = "testuser$timestamp@example.com"
    password = "password123"
    password_confirmation = "password123"
    phone = "0123456789"
    address = "123 Test Street, Hanoi"
} | ConvertTo-Json

try {
    $registerResponse = Invoke-WebRequest -Uri "$baseUrl/register" -Method POST -ContentType "application/json" -Body $registerBody
    $registerData = $registerResponse.Content | ConvertFrom-Json
    
    Write-Host "Status: SUCCESS" -ForegroundColor Green
    Write-Host "User ID: $($registerData.user.id)" -ForegroundColor White
    Write-Host "Name: $($registerData.user.name)" -ForegroundColor White
    Write-Host "Email: $($registerData.user.email)" -ForegroundColor White
    Write-Host "Token: $($registerData.token.Substring(0, 30))..." -ForegroundColor White
    
    $token = $registerData.token
    $userEmail = $registerData.user.email
    
} catch {
    Write-Host "Status: FAILED" -ForegroundColor Red
    if ($_.Exception.Response) {
        $errorResponse = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($errorResponse)
        $errorBody = $reader.ReadToEnd()
        Write-Host "Error: $errorBody" -ForegroundColor Red
    }
    exit
}

Write-Host ""

# ========================================
# Test 2: Login
# ========================================
Write-Host "[TEST 2] User Login" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Gray

$loginBody = @{
    email = $userEmail
    password = "password123"
    remember = $true
} | ConvertTo-Json

try {
    $loginResponse = Invoke-WebRequest -Uri "$baseUrl/login" -Method POST -ContentType "application/json" -Body $loginBody
    $loginData = $loginResponse.Content | ConvertFrom-Json
    
    Write-Host "Status: SUCCESS" -ForegroundColor Green
    Write-Host "Message: $($loginData.message)" -ForegroundColor White
    Write-Host "Token: $($loginData.token.Substring(0, 30))..." -ForegroundColor White
    
    $token = $loginData.token
    
} catch {
    Write-Host "Status: FAILED" -ForegroundColor Red
}

Write-Host ""

# ========================================
# Test 3: Get User Info (Protected)
# ========================================
Write-Host "[TEST 3] Get User Info (Protected Route)" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Gray

try {
    $headers = @{
        "Authorization" = "Bearer $token"
        "Accept" = "application/json"
    }
    
    $userResponse = Invoke-WebRequest -Uri "$baseUrl/user" -Method GET -Headers $headers
    $userData = $userResponse.Content | ConvertFrom-Json
    
    Write-Host "Status: SUCCESS" -ForegroundColor Green
    Write-Host "Name: $($userData.user.name)" -ForegroundColor White
    Write-Host "Email: $($userData.user.email)" -ForegroundColor White
    Write-Host "Phone: $($userData.user.phone)" -ForegroundColor White
    Write-Host "Address: $($userData.user.address)" -ForegroundColor White
    
} catch {
    Write-Host "Status: FAILED" -ForegroundColor Red
}

Write-Host ""

# ========================================
# Test 4: Get All Products
# ========================================
Write-Host "[TEST 4] Get All Products" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Gray

try {
    $productsResponse = Invoke-WebRequest -Uri "$baseUrl/products" -Method GET
    $productsData = $productsResponse.Content | ConvertFrom-Json
    
    Write-Host "Status: SUCCESS" -ForegroundColor Green
    Write-Host "Total Products: $($productsData.data.Count)" -ForegroundColor White
    
    if ($productsData.data.Count -gt 0) {
        Write-Host "`nFirst 3 Products:" -ForegroundColor Gray
        for ($i = 0; $i -lt [Math]::Min(3, $productsData.data.Count); $i++) {
            $product = $productsData.data[$i]
            Write-Host "  - $($product.name) ($($product.price) VND)" -ForegroundColor White
        }
        $firstProductId = $productsData.data[0].id
    }
    
} catch {
    Write-Host "Status: FAILED" -ForegroundColor Red
}

Write-Host ""

# ========================================
# Test 5: Get Single Product
# ========================================
if ($firstProductId) {
    Write-Host "[TEST 5] Get Single Product (ID: $firstProductId)" -ForegroundColor Yellow
    Write-Host "----------------------------------------" -ForegroundColor Gray
    
    try {
        $productResponse = Invoke-WebRequest -Uri "$baseUrl/products/$firstProductId" -Method GET
        $productData = $productResponse.Content | ConvertFrom-Json
        
        Write-Host "Status: SUCCESS" -ForegroundColor Green
        Write-Host "Name: $($productData.data.name)" -ForegroundColor White
        Write-Host "Price: $($productData.data.price) VND" -ForegroundColor White
        Write-Host "Brand: $($productData.data.brand)" -ForegroundColor White
        Write-Host "Stock: $($productData.data.stock)" -ForegroundColor White
        
    } catch {
        Write-Host "Status: FAILED" -ForegroundColor Red
    }
    
    Write-Host ""
}

# ========================================
# Test 6: Search Products
# ========================================
Write-Host "[TEST 6] Search Products (query: 'phone')" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Gray

try {
    $searchResponse = Invoke-WebRequest -Uri "$baseUrl/products/search?query=phone" -Method GET
    $searchData = $searchResponse.Content | ConvertFrom-Json
    
    Write-Host "Status: SUCCESS" -ForegroundColor Green
    Write-Host "Results Found: $($searchData.data.Count)" -ForegroundColor White
    
} catch {
    Write-Host "Status: FAILED" -ForegroundColor Red
}

Write-Host ""

# ========================================
# Test 7: Logout
# ========================================
Write-Host "[TEST 7] User Logout" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Gray

try {
    $headers = @{
        "Authorization" = "Bearer $token"
        "Accept" = "application/json"
    }
    
    $logoutResponse = Invoke-WebRequest -Uri "$baseUrl/logout" -Method POST -Headers $headers
    $logoutData = $logoutResponse.Content | ConvertFrom-Json
    
    Write-Host "Status: SUCCESS" -ForegroundColor Green
    Write-Host "Message: $($logoutData.message)" -ForegroundColor White
    
} catch {
    Write-Host "Status: FAILED" -ForegroundColor Red
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  ALL TESTS COMPLETED!" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan
