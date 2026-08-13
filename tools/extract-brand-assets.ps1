param(
  [Parameter(Mandatory = $true)]
  [string] $SourceDirectory,

  [Parameter(Mandatory = $true)]
  [string] $OutputDirectory
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$sourceDirectoryPath = [System.IO.Path]::GetFullPath($SourceDirectory)
$outputDirectoryPath = [System.IO.Path]::GetFullPath($OutputDirectory)
[System.IO.Directory]::CreateDirectory($outputDirectoryPath) | Out-Null

function Export-TransparentCrop {
  param(
    [string] $Source,
    [string] $Name,
    [int] $X,
    [int] $Y,
    [int] $Width,
    [int] $Height
  )

  $sourceImage = [System.Drawing.Bitmap]::FromFile($Source)
  try {
    $crop = New-Object System.Drawing.Bitmap $Width, $Height, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    try {
      $graphics = [System.Drawing.Graphics]::FromImage($crop)
      try {
        $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
        $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.DrawImage(
          $sourceImage,
          (New-Object System.Drawing.Rectangle 0, 0, $Width, $Height),
          (New-Object System.Drawing.Rectangle $X, $Y, $Width, $Height),
          [System.Drawing.GraphicsUnit]::Pixel
        )
      }
      finally {
        $graphics.Dispose()
      }

      for ($pixelY = 0; $pixelY -lt $Height; $pixelY++) {
        for ($pixelX = 0; $pixelX -lt $Width; $pixelX++) {
          $pixel = $crop.GetPixel($pixelX, $pixelY)
          $brightness = [Math]::Max($pixel.R, [Math]::Max($pixel.G, $pixel.B))

          if ($brightness -le 8) {
            $alpha = 0
          }
          elseif ($brightness -lt 28) {
            $alpha = [Math]::Min(255, [int](($brightness - 8) * 12.75))
          }
          else {
            $alpha = 255
          }

          $crop.SetPixel($pixelX, $pixelY, [System.Drawing.Color]::FromArgb($alpha, $pixel.R, $pixel.G, $pixel.B))
        }
      }

      $destination = Join-Path $outputDirectoryPath "$Name.png"
      $crop.Save($destination, [System.Drawing.Imaging.ImageFormat]::Png)
      Write-Output $destination
    }
    finally {
      $crop.Dispose()
    }
  }
  finally {
    $sourceImage.Dispose()
  }
}

$paletteElements = Join-Path $sourceDirectoryPath '4-Photo-4.jpg'
$paletteIcons = Join-Path $sourceDirectoryPath '5-Photo-5.jpg'

$elementCrops = @(
  @{ Name = 'mountain'; X = 796; Y = 38; Width = 330; Height = 190 },
  @{ Name = 'forest'; X = 754; Y = 248; Width = 350; Height = 160 },
  @{ Name = 'moon'; X = 1140; Y = 35; Width = 105; Height = 82 },
  @{ Name = 'stars'; X = 1132; Y = 146; Width = 118; Height = 111 },
  @{ Name = 'winding-path'; X = 1090; Y = 318; Width = 180; Height = 142 },
  @{ Name = 'gem'; X = 608; Y = 699; Width = 105; Height = 136 },
  @{ Name = 'divider'; X = 731; Y = 742; Width = 278; Height = 96 },
  @{ Name = 'corner-ornaments'; X = 1010; Y = 691; Width = 260; Height = 151 }
)

$iconCrops = @(
  @{ Name = 'service-woodworking'; X = 28; Y = 683; Width = 104; Height = 111 },
  @{ Name = 'service-laser'; X = 143; Y = 683; Width = 104; Height = 111 },
  @{ Name = 'service-fabrication'; X = 258; Y = 683; Width = 104; Height = 111 },
  @{ Name = 'service-automotive'; X = 374; Y = 683; Width = 104; Height = 111 },
  @{ Name = 'service-smart-home'; X = 489; Y = 683; Width = 104; Height = 111 },
  @{ Name = 'service-design'; X = 604; Y = 683; Width = 104; Height = 111 }
)

foreach ($crop in $elementCrops) {
  Export-TransparentCrop -Source $paletteElements @crop
}

foreach ($crop in $iconCrops) {
  Export-TransparentCrop -Source $paletteIcons @crop
}
