export interface Rectangle {
  length: string | number;
  width: string | number;
  colorBoard: string;
  x: number;
  y: number;
}

export interface PackedResult {
  rectangles: Rectangle[];
}

export interface BoardStates {
  length: string | number;
  width: string | number;
  colorBoard: string;
}
export const packRectanglesInAreas = (
  rectangles: BoardStates[],
  areaWidth: number,
  areaHeight: number
) => {
  const packedResults: PackedResult[] = [{ rectangles: [] }];
  let currentX = 0;
  let currentY = 0;
  let maxHeightInRow = 0;
  const widthRectangles = rectangles
    .filter((rectangle) => +rectangle.width > +rectangle.length)
    .sort((a: BoardStates, b: BoardStates) => +b.width - +a.width);
  const heightRectangles = rectangles
    .filter((rectangle) => +rectangle.width < +rectangle.length)
    .sort((a: BoardStates, b: BoardStates) => +b.length - +a.length);
  const squareRectangles = rectangles
    .filter((rectangle) => +rectangle.width === +rectangle.length)
    .sort((a: BoardStates, b: BoardStates) => +b.length - +a.length);
  widthRectangles;
  heightRectangles;
  const filterRectangles = [
    ...squareRectangles,
    ...widthRectangles,
    ...heightRectangles,
  ];
  filterRectangles.forEach((rectangle: BoardStates) => {
    if (currentX + +rectangle.width > areaWidth) {
      currentX = 0;
      currentY += maxHeightInRow + 1;
      maxHeightInRow = 0;
    }

    if (currentY + +rectangle.length > areaHeight) {
      currentY = 0;
      currentX = 0;
      packedResults.push({ rectangles: [] });
      maxHeightInRow = 0;
    }

    const x = currentX;
    const y = currentY;

    currentX += +rectangle.width + 1;
    packedResults[packedResults.length - 1].rectangles.push({
      x,
      y,
      ...rectangle,
    });

    maxHeightInRow = Math.max(maxHeightInRow, +rectangle.length);
  });

  return packedResults;
};
