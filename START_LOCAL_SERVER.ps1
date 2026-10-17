
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

if (-not (Test-Path (Join-Path $root "index.html"))) {
    Add-Type -AssemblyName PresentationFramework
    [System.Windows.MessageBox]::Show(
        "The site files were not extracted.`n`nRight-click the ZIP -> Extract All... -> run OPEN_SITE_WINDOWS.cmd from the extracted folder.",
        "Vahram Portfolio"
    ) | Out-Null
    exit
}

$port = 8070
$prefix = "http://localhost:$port/"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
} catch {
    $port = 8071
    $prefix = "http://localhost:$port/"
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add($prefix)
    $listener.Start()
}

Start-Process "$prefix`index.html?v=10"

Write-Host ""
Write-Host "VAHRAM PORTFOLIO LOCAL PREVIEW"
Write-Host "Open: $prefix"
Write-Host "Keep this window open while viewing."
Write-Host "Press Ctrl+C to stop."
Write-Host ""

$mime = @{
    ".html"  = "text/html; charset=utf-8"
    ".htm"   = "text/html; charset=utf-8"
    ".css"   = "text/css; charset=utf-8"
    ".js"    = "application/javascript; charset=utf-8"
    ".json"  = "application/json; charset=utf-8"
    ".atlas" = "text/plain; charset=utf-8"
    ".png"   = "image/png"
    ".jpg"   = "image/jpeg"
    ".jpeg"  = "image/jpeg"
    ".webp"  = "image/webp"
    ".svg"   = "image/svg+xml"
    ".gif"   = "image/gif"
    ".ico"   = "image/x-icon"
    ".mp4"   = "video/mp4"
    ".webm"  = "video/webm"
    ".pdf"   = "application/pdf"
    ".woff"  = "font/woff"
    ".woff2" = "font/woff2"
    ".ttf"   = "font/ttf"
}

while ($listener.IsListening) {
    $context = $listener.GetContext()
    try {
        $reqPath = [System.Uri]::UnescapeDataString($context.Request.Url.AbsolutePath.TrimStart("/"))
        if ([string]::IsNullOrWhiteSpace($reqPath)) {
            $reqPath = "index.html"
        }

        $candidate = Join-Path $root $reqPath
        $fullPath = [System.IO.Path]::GetFullPath($candidate)
        $rootFull = [System.IO.Path]::GetFullPath($root)

        if (-not $fullPath.StartsWith($rootFull, [System.StringComparison]::OrdinalIgnoreCase)) {
            $context.Response.StatusCode = 403
            $context.Response.Close()
            continue
        }

        if (Test-Path $fullPath -PathType Container) {
            $fullPath = Join-Path $fullPath "index.html"
        }

        if (-not (Test-Path $fullPath -PathType Leaf)) {
            $context.Response.StatusCode = 404
            $context.Response.Close()
            continue
        }

        $ext = [System.IO.Path]::GetExtension($fullPath).ToLowerInvariant()
        if ($mime.ContainsKey($ext)) {
            $context.Response.ContentType = $mime[$ext]
        } else {
            $context.Response.ContentType = "application/octet-stream"
        }

        $bytes = [System.IO.File]::ReadAllBytes($fullPath)
        $context.Response.ContentLength64 = $bytes.Length
        $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
        $context.Response.OutputStream.Close()
    }
    catch {
        try {
            $context.Response.StatusCode = 500
            $context.Response.Close()
        } catch {}
    }
}
