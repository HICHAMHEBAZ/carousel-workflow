# Install the skill into ~\.claude\skills (or pass -Dest for a project: .\install.ps1 -Dest .claude\skills)
param([string]$Dest = (Join-Path $env:USERPROFILE ".claude\skills"))
$ErrorActionPreference = "Stop"
$src = Join-Path $PSScriptRoot "skills\carousel-workflow"
New-Item -ItemType Directory -Force -Path $Dest | Out-Null
$target = Join-Path $Dest "carousel-workflow"
if (Test-Path $target) { Write-Error "already installed at $target (remove it first to reinstall)"; exit 1 }
Copy-Item -Recurse $src $Dest
Write-Host "installed to $target - restart Claude Code"
