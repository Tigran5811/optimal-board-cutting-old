import { useMemo } from "react";
import { RootState } from "../../interface/interface";
import styles from "./Boards.module.css";
import { packRectanglesInAreas } from "../../utils/packRectanglesInAreas/packRectanglesInAreas";

export const Boards: React.FC<RootState> = ({ boards }) => {
  const boardsFilter = useMemo(() => {
    return boards.flatMap((board) => {
      const { length, width, colorBoard } = board;
      const quantity = +board.quantity;
      return Array.from({ length: quantity }, () => ({
        length,
        width,
        colorBoa,
      }));
    });
  }, [boards]);

  const packedResults = packRectanglesInAreas(boardsFilter, 3630, 1830);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        {packedResults.map((board, index) => {
          return (
            <div key={index} className={styles.board}>
              <p className={styles.length}>1830 MM</p>
              <p className={styles.width}>3630 MM</p>
              {board.rectangles.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      left: Math.ceil(item.x / 3),
                      top: Math.ceil(item.y / 3),
                      position: "absolute",
                      border: "1px solid #fff",
                      width: Math.ceil(+item.width / 3),
                      backgroundColor: item.colorBoard,
                      height: Math.ceil(+item.length / 3),
                    }}
                  ></div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
