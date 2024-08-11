<?php
// 获取文件路径参数并解码
$filePath = isset($_GET['file']) ? trim(str_replace('//', '/', $_GET['file']), '/') : '';

// 根据文件路径构建完整文件路径
$fileDirectory = 'files/' . $filePath;


// 根据开关状态设置文件存储路径
//if ($_GET['useGitHub'] == 'true') {
//    $fileDirectory = 'https://xiaomiaoica.github.io/cloud_storage/files/';
//} else {
//    $fileDirectory = 'files/';
//}

$fileDirectory = 'files/';

// 构建完整的文件路径
$fileFullPath = $fileDirectory . $filePath;

// 检查文件是否存在
if (file_exists($fileFullPath)) {
    // 获取文件类型
    $fileExtension = pathinfo($fileFullPath, PATHINFO_EXTENSION);

    // 设置文件类型
    switch ($fileExtension) {
        case 'png':
        case 'jpg':
        case 'jepg':
        case 'bmp':
        case 'webp':
        case 'tiff':
        case 'heic':
        case 'heif':
        case 'gif':
        case 'ico':
            header('Content-Type: image/' . $fileExtension);
            break;
        case 'txt':
        case 'php':
        case 'cmd':
        case 'ini':
            header('Content-Type: text/plain');
            break;
        case 'html':
            header('Content-Type: text/html');
            break;
        case 'oog':
        case 'mp3':
        case 'aac':
        case 'flac':
        case 'wav':
            header('Content-Type: audio/mpeg');
            break;
        case 'mp4':
        case 'webm':
            header('Content-Type: video/mp4');
            break;
        case 'pdf':
            header('Content-Type: application/pdf');
            break;
        default:
            header('Content-Type: application/octet-stream');
    }

    // 设置打开方式
    header('Content-Disposition: inline; filename="' . basename($fileFullPath) . '"');

    // 读取文件并输出给用户
    readfile($fileFullPath);
    exit;
} else {
    // 文件不存在
    http_response_code(404);
    echo "文件不存在。";
}
?>
