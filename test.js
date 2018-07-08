const uploadCDN = require('./index.js');

const SSO_CONFIG = {
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAI3aUUyVOY5q06',
    accessKeySecret: 'WZDibtiE0nwOCjHBwWMYGX0jUtz2de',
    bucket: 'css3-img'
}

uploadCDN(SSO_CONFIG, {
    namespace: 'static-pages',
    uploadDir: './test-x'
})
