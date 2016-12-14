'use strict';

var rp = require('request-promise-native');
const imageToAscii = require("image-to-ascii");

const options = {
  uri: 'https://www.instagram.com/aceitunagrill/media/',
  transform: (body) => JSON.parse(body)
};

const imgOpts = {
  bg: true,
  pixels: ' '
};

const req = rp(options).then((body) => {
  const items = body.items;
  const recent = items[0];

  imageToAscii(recent.images.standard_resolution.url, imgOpts, (err, converted) => {
    console.log(err || converted);
  });
}).catch((err) => {});
