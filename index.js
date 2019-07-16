var OSS = require('ali-oss');
var fs = require('fs');
var path = require('path');
var zlib = require('zlib');

var rootPath = '';
var namespace = '';
var uploadFiles = [];
var client = null;

var HEADERS_COMMON = {
    'Cache-Control': 'max-age=31104000',
}
var HEADERS_GZIP = {
    'Cache-Control': 'max-age=31104000',
    'Content-Encoding': 'gzip',
}

module.exports = function (ossConfig, config){
    client = new OSS.Wrapper(ossConfig);
    rootPath = path.resolve(config.uploadDir);
    uploadFiles = config.uploadFiles;
    namespace = config.namespace;

    if(Array.isArray(uploadFiles)) {
        uploadFiles.forEach(file => {
            const filepath = path.resolve(rootPath, file);
            if(-1 === filepath.indexOf(rootPath)){
                throw Error('file in uploadFiles must be in uploadDir!')
            }
            uploadFile(filepath);
        })
    }
    else {
        walkUpload(rootPath);
    }
}

function isCssOrJs(url = ''){
    return url.endsWith(".js") || url.endsWith(".css")
}

function uploadFile (file) {
    let fileKey = file.slice(rootPath.length + 1);
    fileKey = namespace ? `${namespace}/${fileKey}` : fileKey;

    let headers = HEADERS_COMMON;

    // if css or js, need gzip
    if(isCssOrJs(fileKey)) {

        // add response header gzip
        headers = HEADERS_GZIP;

        //gzip stream
        file = fs.createReadStream(file).pipe(zlib.createGzip())
    }

    client.put(fileKey, file, { headers }).then(function (r1) {
        console.log('success:', r1.url);
        return client.get(fileKey);
    })
    .catch(function (err) {
        console.error('========error:', fileKey, err);
    });
}

/**
 * 文件遍历上传
 * @param filePath 需要遍历的文件路径
 */
function walkUpload(filePath){

    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath,function(err,files){
        if(err){
            console.warn(err)
        }else{
            //遍历读取到的文件列表
            files.forEach(function(filename){
                //获取当前文件的绝对路径
                var filedir = path.join(filePath,filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,function(eror,stats){
                    if(eror){
                        console.warn('获取文件stats失败');
                    }else{
                        var isFile = stats.isFile();//是文件
                        var isDir = stats.isDirectory();//是文件夹
                        if(isDir){
                            walkUpload(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                        if(isFile){
                            uploadFile(filedir)
                        }
                    }
                })
            });
        }
    });
}

