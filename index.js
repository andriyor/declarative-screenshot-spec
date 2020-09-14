const fs = require('fs')

const { chromium } = require('playwright');
const { createCanvas, loadImage } = require('canvas')
const sizeOf = require('image-size');

(async () => {
  const browser = await chromium.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://github.com/');
  await page.screenshot({ path: `example.png` });
  const header = await page.$('main .jumbotron-codelines .rounded-1');
  const rect = await page.evaluate((header) => {
    const { x, y, width, height } = header.getBoundingClientRect();
    return { x, y, width, height };
  }, header);
  console.log(rect);
  
  const { width, height } = sizeOf('./example.png');
  
  const canvas = createCanvas(width, height)
  const context = canvas.getContext('2d')
  
  context.fillRect(0, 0, width, height)
  
  const image = await loadImage('./example.png');
  context.drawImage(image, 0, 0, width, height)
  context.beginPath();
  context.lineWidth = 6;
  context.strokeStyle = "red";
  context.rect(rect.x, rect.y, rect.width, rect.height);
  context.stroke();
  const buffer = canvas.toBuffer('image/png')
  fs.writeFileSync('./test.png', buffer)

  
})();
