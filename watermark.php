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

// получаем размеры изображения
list($width, $height) = getimagesize($image_path);

// получение новых размеров
$percent = 0.2;
$ratio = $watermark_width / $watermark_height;
if ($height >= $width) {
	$new_width = $width * $percent;
	$new_height = $new_width / $ratio;
} else {
	$new_height = $height * $percent;
	$new_width = $new_height * $ratio;
}

// помещаем водяной знак на изображение
$dest_x = $width - $new_width - 10;
$dest_y = $height - $new_height - 10;

// ресэмплирование
$watermark_new = imagecreatetruecolor($new_width, $new_height);
$trans_colour = imagecolorallocatealpha($watermark_new, 0, 0, 0, 127);
imagefill($watermark_new, 0, 0, $trans_colour);
imagecopyresampled($watermark_new, $watermark, 0, 0, 0, 0, $new_width, $new_height, $watermark_width, $watermark_height);

imagealphablending($image, true);
imagealphablending($watermark_new, true);
// создаём новое изображение
imagecopy($image, $watermark_new, $dest_x, $dest_y, 0, 0, $new_width, $new_height);
imagejpeg($image);

// освобождаем память
imagedestroy($image);
imagedestroy($watermark);  
imagedestroy($watermark_new);

?>
