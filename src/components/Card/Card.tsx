import { useCallback, useState } from "react";
import { BoardState, CardProps } from "../../interface/interface";
import styles from "./Card.module.css";

export const Card: React.FC<CardProps> = ({ boards, onUpdate, removeItem }) => {
  const [{ length, width, quantity, colorBoard }, setUpdatedBoard] =
    useState<BoardState>({
      length: "",
      width: "",
      quantity: "",
      colorBoard: "",
    });

  const handleChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      key: string,
      board: BoardState
    ) => {
      setUpdatedBoard({
        length: length || board.length,
        width: width || board.width,
        quantity: quantity || board.quantity,
        colorBoard: colorBoard || board.colorBoard,
        [key]: event.target.value,
      });
    },
    []
  );

  const updateBoard = useCallback(
    ({ length, width, quantity, colorBoard }: BoardState) => {
      onUpdate({ length, width, quantity, colorBoard });
      setUpdatedBoard({
        length: "",
        width: "",
        quantity: "",
        colorBoard: "",
      });
    },
    [onUpdate, length, width, quantity, colorBoard]
  );

  return (
    <>
      {boards.map((board, index) => {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <input
                defaultValue={board.length}
                type="number"
                onChange={(e) => handleChange(e, "length", board)}
              />
            </td>
            <td>
              <input
                type="number"
                defaultValue={board.width}
                onChange={(e) => handleChange(e, "width", board)}
              />
            </td>
            <td>
              <input
                type="number"
                defaultValue={board.quantity}
                onChange={(e) => handleChange(e, "quantity", board)}
              />
            </td>
            <td>
              <p
                className={styles.color}
                style={{
                  backgroundColor: `${board.colorBoard}`,
                }}
              ></p>
            </td>
            <td>
              <button
                disabled={board.colorBoard !== colorBoard}
                onClick={() => {
                  updateBoard({ length, width, quantity, colorBoard });
                }}
              >
                Edit
              </button>
            </td>
            <td>
              <button
                onClick={() => {
                  removeItem(index);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </>
  );
};
