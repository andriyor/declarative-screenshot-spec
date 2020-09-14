// https://github.com/frogcat/canvas-arrow

const arrow = (ctx, startX, startY, endX, endY, controlPoints) => {
  const dx = endX - startX;
  const dy = endY - startY;
  const len = Math.sqrt(dx * dx + dy * dy);
  const sin = dy / len;
  const cos = dx / len;
  const a = [];
  a.push(0, 0);
  for (let i = 0; i < controlPoints.length; i += 2) {
    let x = controlPoints[i];
    let y = controlPoints[i + 1];
    a.push(x < 0 ? len + x : x, y);
  }
  a.push(len, 0);
  for (let i = controlPoints.length; i > 0; i -= 2) {
    let x = controlPoints[i - 2];
    let y = controlPoints[i - 1];
    a.push(x < 0 ? len + x : x, -y);
  }
  a.push(0, 0);
  for (let i = 0; i < a.length; i += 2) {
    let x = a[i] * cos - a[i + 1] * sin + startX;
    let y = a[i] * sin + a[i + 1] * cos + startY;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
};

module.exports = {arrow};
