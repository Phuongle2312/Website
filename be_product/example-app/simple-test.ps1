# Simple API Test
$baseUrl = "http://localhost:8000/api"
$timestamp = Get-Date -Format "HHmmss"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Laravel API Test - Registration" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Test Registration
$registerBody = @{
    name = "Test User $timestamp"
    email = "test$timestamp@example.com"
    password = "password123"
    password_confirmation = "password123"
} | ConvertTo-Json

Write-Host "Sending registration request..." -ForegroundColor Yellow
Write-Host "Email: test$timestamp@example.com" -ForegroundColor Gray

try {
    $response = Invoke-WebRequest -Uri "$baseUrl/register" -Method POST -ContentType "application/json" -Body $registerBody
    $data = $response.Content | ConvertFrom-Json
    
    Write-Host ""
    Write-Host "SUCCESS!" -ForegroundColor Green
    Write-Host "----------------------------------------" -ForegroundColor Gray
    Write-Host "User ID: $($data.user.id)" -ForegroundColor White
    Write-Host "Name: $($data.user.name)" -ForegroundColor White
    Write-Host "Email: $($data.user.email)" -ForegroundColor White
    Write-Host "Token: $($data.token.Substring(0, 40))..." -ForegroundColor White
    Write-Host "Message: $($data.message)" -ForegroundColor White
    Write-Host "----------------------------------------" -ForegroundColor Gray
    
} catch {
    Write-Host ""
    Write-Host "FAILED!" -ForegroundColor Red
    Write-Host "----------------------------------------" -ForegroundColor Gray
    
    if ($_.Exception.Response) {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "Status Code: $statusCode" -ForegroundColor Red
        
        $errorResponse = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($errorResponse)
        $errorBody = $reader.ReadToEnd()
        Write-Host "Error Details: $errorBody" -ForegroundColor Red
    } else {
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    Write-Host "----------------------------------------" -ForegroundColor Gray
}

Write-Host ""
