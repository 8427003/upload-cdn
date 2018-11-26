# upload-cdn
## 阿里云oss, 静态资源批量上传

### 安装  
```
// 由于未发布到npm上，请通过github源安装依赖
在 package.json 文件中

"dependencies": {
    "upload-cdn": "git+https://github.com/8427003/upload-cdn.git",
}

npm install --save  upload-cdn
```

### 使用
```
const uploadCDN = require('upload-cdn');

const SSO_CONFIG = {
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAI3aUUyVOY5q06',
    accessKeySecret: 'WZDibtiE0nwOCjHBwWMYGX0jUtz2d',
    bucket: 'css3-img'
}

uploadCDN(SSO_CONFIG, {
    namespace: 'static-pages/static', // 访问路径前缀
    uploadDir: './test-x' // 要上传的文件夹
})

// output
success: http://websiteh5.oss-cn-beijing.aliyuncs.com/static-pages/static/imgs/logo.09d8c515.png
```

### 注意
1. 所有资源文件被加上 Cache-Control: max-age=31104000 响应头
2. css 和 js 文件会被gzip压缩后再上传，并添加响应头gzip
3. 重复上传会覆盖先前文件
