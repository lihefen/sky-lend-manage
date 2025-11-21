import forge from 'node-forge';
import JSEncrypt from 'jsencrypt';

export const encryptDataWithRSA = (data, publicKey) => {
    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(publicKey);
    const blockSize = 53; // 根据密钥大小调整此值，对于2048位的RSA，最大加密数据长度大约为245字节(考虑填充后)
    let byteArrays = [];
    for (let i = 0; i < data.length; i += blockSize) {
        let block = data.substr(i, blockSize);
        let encryptedBlock = encryptor.encrypt(block);
        console.log("明文encryptedBlock数:", encryptedBlock);
        // 使用forge将Base64编码的加密块转换为字节数组
        let byteArray = forge.util.decode64(encryptedBlock);
        // 将字符串转为字节数组
        byteArrays.push([...byteArray].map(c => c.charCodeAt(0)));
    }
    let combined = new Uint8Array(byteArrays.flat());
    // 将合并后的字节数组转换回Base64
    let finalBase64 = forge.util.encode64(String.fromCharCode.apply(null, combined));
    return finalBase64;
    
}