<?php
// 设置文件存储根路径
$rootDirectory = 'files/';

// 获取路径参数并解码
$path = isset($_GET['path']) ? trim(str_replace('//', '/', $_GET['path']), '/') : '';

// 构建完整的路径
$filePath = $rootDirectory . $path;

// 如果路径为空，则返回根目录下的文件列表
if (empty($path)) {
    $filePath = $rootDirectory;
}

// 确保路径存在且是一个目录
if (is_dir($filePath)) {
    // 扫描目录
    $fileList = scandir($filePath);
    // 移除 . 和 .. 目录
    $fileList = array_diff($fileList, array('.', '..'));
    // 遍历文件列表
    $result = [];
    foreach ($fileList as $file) {
        $fullPath = $filePath . '/' . $file;
        // 检查文件类型
        if (is_dir($fullPath)) {
            $result[] = [
                'name' => $file,
                'type' => 'dir',
                'path' => $path . '/' . $file
            ];
        } else {
            $result[] = [
                'name' => $file,
                'type' => 'file',
                'path' => $path . '/' . $file
            ];
        }
    }
    // 输出 JSON 格式的文件列表
    echo json_encode($result);
} else {
    // 如果路径不存在或不是一个目录，则返回空数组
    echo json_encode([]);
}
?>
