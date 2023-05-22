'use strict';

const crypto = require('crypto-js');

module.exports.gateway = async (event) => {
  const requestBody = JSON.parse(event.body);

  // encrypt the data
  let encryptedData = encryptData(requestBody.data, '', requestBody.key);
  let response = {
    message: `Sucessfully submitted`,
    encrypted: encryptedData,
  }
  return {
    statusCode: 200,
    body: JSON.stringify(response, null, 2),
    headers: {'content-type': 'application/json'},
  };
};

function encryptData (data, iv, key) {
  let encryptedString = crypto.AES.encrypt(data, key, {
    iv: iv,
    mode: crypto.mode.CBC,
    padding: crypto.pad.Pkcs7,
  });
  return encryptedString.toString();
}