import { ChangeEvent, useCallback, useState } from "react";
import { BoardState, RootState } from "../../interface/interface";
import styles from "./Table.module.css";
import { useDispatch } from "react-redux";
import {
  addBoard,
  removeAllBoards,
  removeBoardByIndex,
  updateBoard,
} from "../../redux/reducers/boards";
import { getRandomColor } from "../../utils/getRandomColor/getRandomColor";
import { Card } from "../Card/Card";

export const Table: React.FC<RootState> = ({ boards }) => {
  const dispatch = useDispatch();
  const [{ length, width, quantity, colorBoard }, setBoard] =
    useState<BoardState>({
      length: "",
      width: "",
      quantity: "",
      colorBoard: getRandomColor(),
    });
  const [{ isWidth, isLength }, setError] = useState({
    isWidth: false,
    isLength: false,
  });

  const onClick = useCallback(() => {
    dispatch(addBoard({ length, width, quantity, colorBoard }));
    setBoard((prevBoard) => ({
      ...prevBoard,
      length: "",
      width: "",
      quantity: "",
      colorBoard: getRandomColor(),
    }));
  }, [length, width, quantity]);

  const onUpdate = useCallback((board: BoardState) => {
    dispatch(updateBoard({ board }));
  }, []);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "length" || name === "width") {
      if (
        (+value <= 0 || +value > (name === "length" ? 1830 : 3630)) &&
        value !== ""
      ) {
        name === "length"
          ? setError((prevState) => ({
              ...prevState,
              isLength: true,
            }))
          : setError((prevState) => ({
              ...prevState,
              isWidth: true,
            }));
        setBoard((prevState: BoardState) => ({
          ...prevState,
          [name]: "",
        }));
        return;
      }
    }

    if (+value <= 0) {
      setBoard((prevState: BoardState) => ({
        ...prevState,
        [name]: "",
      }));
      return;
    }
    setBoard((prevState: BoardState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const onBlur = () => {
    setError({
      isWidth: false,
      isLength: false,
    });
  };

  const removeItem = useCallback((index: number) => {
    dispatch(removeBoardByIndex({ index }));
    window.location.reload();
  }, []);

  const removeAll = useCallback(() => {
    dispatch(removeAllBoards());
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Length (MM)</th>
          <th>Width (MM)</th>
          <th>Quantity</th>
          <th>Color</th>
          <th>Edit part</th>
          <th>
            <button onClick={removeAll}>Delete all</button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td>
            {isLength && (
              <p className={styles.error}>length cannot be greater than 1830</p>
            )}

            <input
              value={length}
              onChange={onChange}
              onBlur={onBlur}
              name="length"
              type="number"
              placeholder="Length"
            />
          </td>
          <td>
            {isWidth && (
              <p className={styles.error}>width cannot be greater than 3630</p>
            )}
            <input
              value={width}
              onChange={onChange}
              onBlur={onBlur}
              name="width"
              type="number"
              placeholder="Width"
            />
          </td>
          <td>
            <input
              value={quantity}
              onBlur={onBlur}
              onChange={onChange}
              name="quantity"
              type="number"
              placeholder="Quantity"
            />
          </td>
          <td>
            <p
              className={styles.color}
              style={{
                backgroundColor: `${colorBoard}`,
              }}
            ></p>
          </td>
          <td>
            <button
              onClick={onClick}
              disabled={
                length === "" ||
                width === "" ||
                quantity === "" ||
                +length === 0 ||
                +width === 0 ||
                +quantity === 0
              }
            >
              Add
            </button>
          </td>
        </tr>
        <Card onUpdate={onUpdate} boards={boards} removeItem={removeItem} />
      </tbody>
    </table>
  );
};
