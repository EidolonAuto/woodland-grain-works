param(
  [string] $SourceDirectory = 'assets/generated',
  [string] $OutputDirectory = 'assets/generated/hd',
  [int] $Scale = 4
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$sourceDirectoryPath = [System.IO.Path]::GetFullPath($SourceDirectory)
$outputDirectoryPath = [System.IO.Path]::GetFullPath($OutputDirectory)
[System.IO.Directory]::CreateDirectory($outputDirectoryPath) | Out-Null

$assetNames = @(
  'corner-ornaments',
  'divider',
  'forest',
  'gem',
  'moon',
  'mountain',
  'stars',
  'winding-path'
)

foreach ($assetName in $assetNames) {
  $sourcePath = Join-Path $sourceDirectoryPath "$assetName.png"
  $destinationPath = Join-Path $outputDirectoryPath "$assetName.png"
  $sourceImage = [System.Drawing.Bitmap]::FromFile($sourcePath)

  try {
    $padding = 32
    $contentWidth = $sourceImage.Width * $Scale
    $contentHeight = $sourceImage.Height * $Scale
    $targetWidth = $contentWidth + ($padding * 2)
    $targetHeight = $contentHeight + ($padding * 2)
    $targetImage = New-Object System.Drawing.Bitmap $targetWidth, $targetHeight, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

    try {
      $targetImage.SetResolution(144, 144)
      $graphics = [System.Drawing.Graphics]::FromImage($targetImage)

      try {
        $graphics.Clear([System.Drawing.Color]::Transparent)
        $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
        $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.DrawImage($sourceImage, $padding, $padding, $contentWidth, $contentHeight)
      }
      finally {
        $graphics.Dispose()
      }

      $targetImage.Save($destinationPath, [System.Drawing.Imaging.ImageFormat]::Png)
      Write-Output $destinationPath
    }
    finally {
      $targetImage.Dispose()
    }
  }
  finally {
    $sourceImage.Dispose()
  }
}
