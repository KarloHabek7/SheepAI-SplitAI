Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "   Antigravity Local Environment Initializer   " -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

# 1. Unblock files (critical on Windows to remove Mark of the Web blocks)
Write-Host "Unblocking files to bypass Windows security restrictions..." -ForegroundColor Yellow
Get-ChildItem -Path "$PSScriptRoot" -Recurse -Force -ErrorAction SilentlyContinue | Unblock-File

# 2. Touch all .agents files to force immediate indexing by the IDE
Write-Host "Touching agent rules and workflows to trigger IDE indexing..." -ForegroundColor Yellow
Get-ChildItem -Path "$PSScriptRoot\.agents" -Recurse -Force -ErrorAction SilentlyContinue | ForEach-Object {
    $_.LastWriteTime = Get-Date
    if ($_ -is [System.IO.FileInfo]) {
        $_.CreationTime = Get-Date
    }
}

# 3. Create .env if it doesn't exist
if (-not (Test-Path "$PSScriptRoot\.env")) {
    Write-Host "Creating .env from .env.example..." -ForegroundColor Yellow
    Copy-Item -Path "$PSScriptRoot\.env.example" -Destination "$PSScriptRoot\.env" -Force
}

Write-Host "Successfully initialized local environment!" -ForegroundColor Green
Write-Host "Please open this root folder in Google Antigravity IDE and run `/setup` in the agent chat." -ForegroundColor Green
