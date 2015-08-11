<?php
header('content-type: image/jpeg'); 

// получаем имя изображения через GET
$image = $_GET['image']; 

// создаём водяной знак
$watermark = imagecreatefrompng('img/watermark.png');   

// получаем значения высоты и ширины водяного знака
$watermark_width = imagesx($watermark);
$watermark_height = imagesy($watermark);  

// создаём jpg из оригинального изображения
$image_path = $image;
$image = imagecreatefromjpeg($image_path);
// если что-то пойдёт не так
if ($image === false) {
    return false;
}
$size = getimagesize($image_path);
// помещаем водяной знак на изображение
$dest_x = $size[0] - $watermark_width - 5;
$dest_y = $size[1] - $watermark_height - 5;

imagealphablending($image, true);
imagealphablending($watermark, true);
// создаём новое изображение
imagecopy($image, $watermark, $dest_x, $dest_y, 0, 0, $watermark_width, $watermark_height);
imagejpeg($image);

// освобождаем память
imagedestroy($image);
imagedestroy($watermark);  

?>
