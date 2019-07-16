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

// 递归上传文件夹中所有文件
uploadCDN(SSO_CONFIG, {
    namespace: 'static-pages/static', // 访问路径前缀 [required]
    uploadDir: './test-x' // 要上传的文件夹 [required]
})

// output
success: http://websiteh5.oss-cn-beijing.aliyuncs.com/static-pages/static/imgs/logo.09d8c515.png

// 上传文件中指定文件
uploadCDN(SSO_CONFIG, {
    namespace: 'static-pages/static', // 访问路径前缀 [required]
    uploadDir: './test-x' // 要上传的文件夹 [required]
    uploadFiles: ['./a.js'] // uploadDir 指定文件夹中部分文件, 未指定此属性则上传文件夹全部文件[option]
})
```


### 注意
1. 所有资源文件被加上 Cache-Control: max-age=31104000 响应头
2. css 和 js 文件会被gzip压缩后再上传，并添加响应头gzip
3. 重复上传会覆盖先前文件
