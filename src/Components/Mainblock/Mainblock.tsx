import "./style.css";
import NewColumn from "../../UI/NewColumn/NewColumn";
import Column from "../Column/Column";
import { useAppSelector } from "../../store/store";

import { Board as BoardType } from "../../data";
import BoardEmpty from "../../UI/BoardEmpty/BoardEmpty";
import ChooseBoard from "../../UI/ChooseBoard/ChooseBoard";
import { useState } from "react";
import ModalWindow from "../../UI/ModalWindow/ModalWindow";
import AddColumn from "../AddColumn/AddColumn";

const MainBlock = () => {
  const selectedBoard = useAppSelector((state) => state.selectedBoard);
  const columnsForRender = useAppSelector(selectColumns);

  const STATE = useAppSelector((state) => state.mainData);
  console.log("+++++++++++++++++ ", STATE);

  const [modalAddColumn, setModalAddColumn] = useState<boolean>(false);

  function selectColumns(state: any) {
    const activeBoard: BoardType = state.mainData.boards.find(
      (board: BoardType) => board.id === selectedBoard.id
    );
    return activeBoard ? activeBoard.columnsIncluded : [];
  }

  return (
    <div className="main-block-body-wrapper ">
      {columnsForRender.map((column, index) => (
        <Column key={column + index} columnId={column} />
      ))}

      {!selectedBoard.id ? (
        <ChooseBoard />
      ) : columnsForRender.length ? (
        <NewColumn action={() => setModalAddColumn(!modalAddColumn)} />
      ) : (
        <BoardEmpty action={() => setModalAddColumn(!modalAddColumn)} />
      )}

      <ModalWindow showModal={modalAddColumn} action={() => setModalAddColumn(!modalAddColumn)}>
        <AddColumn boardID={selectedBoard.id} modalClose={setModalAddColumn} />
      </ModalWindow>
    </div>
  );
};

export default MainBlock;
