
Add-Type -AssemblyName System.Drawing

$inputPath = "c:\Users\aleja\OneDrive\Escritorio\wdd231\chamber\chamber\images\logo.png"
$outputPath = "c:\Users\aleja\OneDrive\Escritorio\wdd231\chamber\chamber\images\logo.png"
$width = 150
$height = 150

$image = [System.Drawing.Image]::FromFile($inputPath)
$newImage = new-object System.Drawing.Bitmap $width, $height

$graphics = [System.Drawing.Graphics]::FromImage($newImage)
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

$graphics.DrawImage($image, 0, 0, $width, $height)
$image.Dispose()

$newImage.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$newImage.Dispose()
$graphics.Dispose()

Write-Host "Resized image saved to $outputPath"
