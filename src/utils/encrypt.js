import CryptoJS from "crypto-js";

export const encryptData = (upiPin) => {
  const encrypted = CryptoJS.AES.encrypt(upiPin, "secret key").toString();
  return encrypted;
};
