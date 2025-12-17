# ========================================
# Laravel API Test Script
# ========================================

$baseUrl = "http://localhost:8000/api"
$timestamp = Get-Date -Format "HHmmss"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  LARAVEL API TESTING SCRIPT" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# ========================================
# Test 1: Register New User
# ========================================
Write-Host "[TEST 1] Testing User Registration..." -ForegroundColor Yellow

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
    
    Write-Host "✓ Registration successful!" -ForegroundColor Green
    Write-Host "  User ID: $($registerData.user.id)" -ForegroundColor Gray
    Write-Host "  Name: $($registerData.user.name)" -ForegroundColor Gray
    Write-Host "  Email: $($registerData.user.email)" -ForegroundColor Gray
    Write-Host "  Token: $($registerData.token.Substring(0, 20))..." -ForegroundColor Gray
    
    $token = $registerData.token
    $userEmail = $registerData.user.email
    
} catch {
    Write-Host "✗ Registration failed!" -ForegroundColor Red
    $errorResponse = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($errorResponse)
    $errorBody = $reader.ReadToEnd()
    Write-Host "  Error: $errorBody" -ForegroundColor Red
    exit
}

Write-Host ""

# ========================================
# Test 2: Login with Created User
# ========================================
Write-Host "[TEST 2] Testing User Login..." -ForegroundColor Yellow

$loginBody = @{
    email = $userEmail
    password = "password123"
    remember = $true
} | ConvertTo-Json

try {
    $loginResponse = Invoke-WebRequest -Uri "$baseUrl/login" -Method POST -ContentType "application/json" -Body $loginBody
    $loginData = $loginResponse.Content | ConvertFrom-Json
    
    Write-Host "✓ Login successful!" -ForegroundColor Green
    Write-Host "  Message: $($loginData.message)" -ForegroundColor Gray
    Write-Host "  Token: $($loginData.token.Substring(0, 20))..." -ForegroundColor Gray
    
    $token = $loginData.token
    
} catch {
    Write-Host "✗ Login failed!" -ForegroundColor Red
    $errorResponse = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($errorResponse)
    $errorBody = $reader.ReadToEnd()
    Write-Host "  Error: $errorBody" -ForegroundColor Red
}

Write-Host ""

# ========================================
# Test 3: Get Authenticated User Info
# ========================================
Write-Host "[TEST 3] Testing Get User Info (Protected Route)..." -ForegroundColor Yellow

try {
    $headers = @{
        "Authorization" = "Bearer $token"
        "Accept" = "application/json"
    }
    
    $userResponse = Invoke-WebRequest -Uri "$baseUrl/user" -Method GET -Headers $headers
    $userData = $userResponse.Content | ConvertFrom-Json
    
    Write-Host "✓ Get user info successful!" -ForegroundColor Green
    Write-Host "  Name: $($userData.user.name)" -ForegroundColor Gray
    Write-Host "  Email: $($userData.user.email)" -ForegroundColor Gray
    Write-Host "  Phone: $($userData.user.phone)" -ForegroundColor Gray
    
} catch {
    Write-Host "✗ Get user info failed!" -ForegroundColor Red
    $errorResponse = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($errorResponse)
    $errorBody = $reader.ReadToEnd()
    Write-Host "  Error: $errorBody" -ForegroundColor Red
}

Write-Host ""

# ========================================
# Test 4: Get All Products
# ========================================
Write-Host "[TEST 4] Testing Get All Products..." -ForegroundColor Yellow

try {
    $productsResponse = Invoke-WebRequest -Uri "$baseUrl/products" -Method GET
    $productsData = $productsResponse.Content | ConvertFrom-Json
    
    Write-Host "✓ Get products successful!" -ForegroundColor Green
    Write-Host "  Total products: $($productsData.data.Count)" -ForegroundColor Gray
    
    if ($productsData.data.Count -gt 0) {
        Write-Host "  First product: $($productsData.data[0].name)" -ForegroundColor Gray
        $firstProductId = $productsData.data[0].id
    }
    
} catch {
    Write-Host "✗ Get products failed!" -ForegroundColor Red
    $errorResponse = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($errorResponse)
    $errorBody = $reader.ReadToEnd()
    Write-Host "  Error: $errorBody" -ForegroundColor Red
}

Write-Host ""

# ========================================
# Test 5: Get Single Product
# ========================================
if ($firstProductId) {
    Write-Host "[TEST 5] Testing Get Single Product (ID: $firstProductId)..." -ForegroundColor Yellow
    
    try {
        $productResponse = Invoke-WebRequest -Uri "$baseUrl/products/$firstProductId" -Method GET
        $productData = $productResponse.Content | ConvertFrom-Json
        
        Write-Host "✓ Get product successful!" -ForegroundColor Green
        Write-Host "  Name: $($productData.data.name)" -ForegroundColor Gray
        Write-Host "  Price: $($productData.data.price)" -ForegroundColor Gray
        Write-Host "  Brand: $($productData.data.brand)" -ForegroundColor Gray
        
    } catch {
        Write-Host "✗ Get product failed!" -ForegroundColor Red
        $errorResponse = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($errorResponse)
        $errorBody = $reader.ReadToEnd()
        Write-Host "  Error: $errorBody" -ForegroundColor Red
    }
    
    Write-Host ""
}

# ========================================
# Test 6: Search Products
# ========================================
Write-Host "[TEST 6] Testing Search Products (query: 'phone')..." -ForegroundColor Yellow

try {
    $searchResponse = Invoke-WebRequest -Uri "$baseUrl/products/search?query=phone" -Method GET
    $searchData = $searchResponse.Content | ConvertFrom-Json
    
    Write-Host "✓ Search products successful!" -ForegroundColor Green
    Write-Host "  Results found: $($searchData.data.Count)" -ForegroundColor Gray
    
} catch {
    Write-Host "✗ Search products failed!" -ForegroundColor Red
    $errorResponse = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($errorResponse)
    $errorBody = $reader.ReadToEnd()
    Write-Host "  Error: $errorBody" -ForegroundColor Red
}

Write-Host ""

# ========================================
# Test 7: Logout
# ========================================
Write-Host "[TEST 7] Testing User Logout..." -ForegroundColor Yellow

try {
    $headers = @{
        "Authorization" = "Bearer $token"
        "Accept" = "application/json"
    }
    
    $logoutResponse = Invoke-WebRequest -Uri "$baseUrl/logout" -Method POST -Headers $headers
    $logoutData = $logoutResponse.Content | ConvertFrom-Json
    
    Write-Host "✓ Logout successful!" -ForegroundColor Green
    Write-Host "  Message: $($logoutData.message)" -ForegroundColor Gray
    
} catch {
    Write-Host "✗ Logout failed!" -ForegroundColor Red
    $errorResponse = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($errorResponse)
    $errorBody = $reader.ReadToEnd()
    Write-Host "  Error: $errorBody" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ALL TESTS COMPLETED!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
