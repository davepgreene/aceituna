'use strict';

var rp = require('request-promise-native');
const imageToAscii = require("image-to-ascii");
const path = require('path');

const options = {
  uri: 'https://www.instagram.com/aceitunagrill/media/',
  transform: (body) => JSON.parse(body)
};

const promisify = (func) => {
  return new Promise((resolve, reject) => {
    func(function handler(err, result) {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}

const imgOpts = {
  bg: true,
  pixels: ' '
};

module.exports = rp(options).then((body) => {
  const items = body.items;
  const recent = items[0];

  return promisify((f) => imageToAscii(recent.images.standard_resolution.url, imgOpts, f));
}).catch((err) => {
    const img = path.resolve(__dirname, 'img/khaled.png');
    return promisify((f) => imageToAscii(img, imgOpts, f));
});