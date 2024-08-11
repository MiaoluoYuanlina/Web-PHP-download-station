window.onload = function() {
    var fileList = document.getElementById('fileList');
    var switchStatus = document.getElementById('switchStatus');
    var currentPath = ''; // 用于存储当前路径
    



    // 发送 AJAX 请求获取文件列表
    function getFileList(path) {
        currentPath = path; // 更新当前路径
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'get_files.php?path=' + encodeURIComponent(path.replace(/\//g, '//')), true);
        xhr.onload = function() {
            if (xhr.status == 200) {
                var files = JSON.parse(xhr.responseText);
                var baseUrl = 'https://xiaomiaoica.github.io/cloud_storage/files/';
                var url = baseUrl + path;
                // 清空文件列表
                fileList.innerHTML = '';
                
                // 添加返回上一级目录的链接
                if (path !== '') {
                    var li = document.createElement('li');
                    var a = document.createElement('a');
                    a.setAttribute('href', '#返回上一级文件夹');
                    a.textContent = '   ←返回上一级文件夹';
                    a.addEventListener('click', function() {
                        var lastIndex = path.lastIndexOf('/');
                        var parentPath = path.substring(0, lastIndex);
                        getFileList(parentPath);
                    });
                    li.appendChild(a);
                    fileList.appendChild(li);
                }
                
                // 遍历文件列表并创建列表项
                files.forEach(function(file) {
                    var li = document.createElement('li');
                    var a = document.createElement('a');
                    if (file.type === 'dir') {
                        a.setAttribute('href', '#文件夹');
                        a.setAttribute('data-type', 'dir');
                        a.setAttribute('data-path', file.path);
                        a.addEventListener('click', function() {
                            getFileList(file.path);
                        });
                        // 在文件夹名称加上“(文件夹)”标记
                        a.textContent = file.name + '（文件夹）';
                    } else {
                        var downloadUrlPrefix = downloadSwitch.checked ? 'download.php?file=' + encodeURIComponent(file.path.replace(/\//g, '//')) : baseUrl + file.path;
                        
                        a.setAttribute('href', downloadUrlPrefix + '' + '');
                        a.textContent = file.name;
                        
                    }
                    li.appendChild(a);
                    fileList.appendChild(li);
                });
            } else {
                console.error('获取文件列表失败：' + xhr.status);
            }
        };
        xhr.send();
    }
    

    // 默认加载GitHub节点文件列表
    if (switchStatus) {
        switchStatus.textContent = '目前节点:XiaoMiaoICa.GitHub.io';
    }
    getFileList('');


    // 添加事件监听器以响应开关状态变化
    var downloadSwitch = document.getElementById('downloadSwitch');
    downloadSwitch.addEventListener('change', function() {
        if (this.checked) {
            switchStatus.textContent = '目前节点:XiaoMiao-ICa.top';
        } else {
            switchStatus.textContent = '目前节点:XiaoMiaoICa.GitHub.io';
        }

        switchStatus.classList.add('text-animation');
        setTimeout(function() {
            switchStatus.classList.remove('text-animation');
        }, 500); // 动画持续时间为 0.5 秒
        
        // 根据当前路径重新加载文件列表
        getFileList(currentPath);
    });

    
    getFileList('');
};


