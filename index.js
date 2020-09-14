const fs = require('fs')

const sharp = require('sharp');
const sizeOf = require('image-size');
const {chromium} = require('playwright');
const {createCanvas, loadImage} = require('canvas');
const slugify = require('@sindresorhus/slugify');

(async () => {
  const browser = await chromium.launch({headless: false});
  const page = await browser.newPage();
  
  const rawConfig = fs.readFileSync('config.json');
  const config = JSON.parse(rawConfig);
  const tempFileName = 'temp.png';
  
  for (const pageConfig of config.pages) {
    await page.goto(pageConfig.url);
    await page.screenshot({path: tempFileName});
    const header = await page.$(pageConfig.selector);
    const rect = await page.evaluate((header) => {
      const {x, y, width, height} = header.getBoundingClientRect();
      return {x, y, width, height};
    }, header);
    
    const {width, height} = sizeOf(tempFileName);
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');
  
    for (const object of pageConfig.drawObjects) {
      if (object.type === 'rect') {
        context.fillRect(0, 0, width, height)
  
        const image = await loadImage(tempFileName);
        context.drawImage(image, 0, 0, width, height)
        context.beginPath();
        context.lineWidth = object.lineWidth;
        context.strokeStyle = object.strokeStyle;
        context.rect(rect.x, rect.y, rect.width, rect.height);
        context.stroke();
      }
    }
    
    const buffer = canvas.toBuffer('image/png');
    await sharp(buffer).extract({
      left: Math.round(rect.x) - pageConfig.padding,
      top: Math.round(rect.y) - pageConfig.padding,
      width: Math.round(rect.width) + (pageConfig.padding * 2),
      height: Math.round(rect.height) + (pageConfig.padding * 2)
    }).toFile(`${slugify(pageConfig.name)}.png`);
    
    await fs.unlinkSync(tempFileName);
  }
  await browser.close();
})();
