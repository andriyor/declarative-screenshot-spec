
const getStart = (position, screenWidth, screenHeight) => {
  let startX = 0;
  let startY = 0;
  
  if (position === "←↑") {
    startX = 0;
    startY = 0;
  }
  if (position === "↑→") {
    startX = screenWidth;
    startY = 0;
  }
  if (position === "↓→") {
    startX = screenWidth;
    startY = screenHeight;
  }
  if (position === "←↓") {
    startX = 0;
    startY = screenHeight;
  }
  
  if (position === "↑") {
    startX = screenWidth / 2;
    startY = 0;
  }
  if (position === "→") {
    startX = screenWidth;
    startY = screenHeight / 2;
  }
  if (position === "↓") {
    startX = screenWidth / 2;
    startY = screenHeight;
  }
  if (position === "←") {
    startX = 0;
    startY = screenHeight / 2;
  }
  
  return [startX, startY];
}

const getElementCoordinate = (position, rect) => {
  let endX = 0;
  let endY = 0;
  
  if (position === "↑") {
    endX = rect.x + (rect.width / 2);
    endY = rect.y
  }
  if (position === "→") {
    endX = rect.x + rect.width;
    endY = rect.y + (rect.height / 2);
  }
  if (position === "↓") {
    endX = rect.x + (rect.width / 2);
    endY = rect.y + rect.height;
  }
  if (position === "←") {
    endX = rect.x;
    endY = rect.y + (rect.height / 2);
  }
  
  if (position === "←↑") {
    endX = rect.x;
    endY = rect.y;
  }
  if (position === "↑→") {
    endX = rect.x + rect.width;
    endY = rect.y
  }
  if (position === "↓→") {
    endX = rect.x + rect.width;
    endY = rect.y + rect.height;
  }
  if (position === "←↓") {
    endX = rect.x;
    endY = rect.y + rect.height;
  }
  
  return [endX, endY];
}

module.exports = {getStart, getElementCoordinate};
