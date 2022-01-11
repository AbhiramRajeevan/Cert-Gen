const Jimp = require('jimp') ;

async function textOverlay() {
  // Read the image.
  const image = await Jimp.read('cert.png');

  // Save and overwrite the image
  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
     image.print(font, 10,10, 'Abhiram Rajeevan');
     // Writing image after processing
     await image.writeAsync('cert.png');
}
textOverlay();
