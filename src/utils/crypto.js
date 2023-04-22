import JSEncrypt from "jsencrypt";
function encrypt(publicKey, text) {
    // 创建加密实例
    var crypt = new JSEncrypt();

    // 设置公钥
    crypt.setPublicKey(publicKey);
    return crypt.encrypt(text);
}

export default encrypt;
