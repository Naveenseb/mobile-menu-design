$path = "d:\mobile-menu-design\app\page.tsx"
$lines = Get-Content -Path $path
$idx = $lines.IndexOf('// Menu Page Component')
if ($idx -ge 0) {
    $lines = $lines[0..($idx-1)]
}
$lines | Set-Content -Path $path
Write-Output "trimmed lines until index $idx"