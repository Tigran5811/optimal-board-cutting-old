import styles from "./Container.module.css";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { selectBoards } from "../../redux/selectors/boards";

import { Boards } from "../Boards/Boards";
import { Table } from "../Table/Table";

const cx = classNames.bind(styles);

export const Container = () => {
  const boards = useSelector(selectBoards);

  return (
    <div className={cx("container")}>
      <Table boards={boards} />
      <Boards boards={boards} />
    </div>
  );
};
