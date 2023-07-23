import "./style.css";
import classNames from "classnames";
import DotsMenu from "../../UI/DotsMenu/DotsMenu";
import Button from "../../UI/Button/Button";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { deleteBoard } from "../../slices/data";
import { selectBoard } from "../../slices/selectedBoard";
import ModalWindow from "../../UI/ModalWindow/ModalWindow";
import ConfirmPlate from "../../UI/ConfirmPlate/ConfirmPlate";
import { useEffect, useState } from "react";
import EditBoard from "../EditBoard/EditBoard";
import AddTask from "../AddTask/AddTask";

const Header = ({ sidebarVisibility }: { sidebarVisibility: boolean }) => {
  const selectedBoard = useAppSelector((state) => state.selectedBoard);
  const dispatch = useAppDispatch();

  const [modalDeleteBoard, setModalDeleteBoard] = useState<boolean>(false);
  const [modalEditBoard, setModalEditBoard] = useState<boolean>(false);
  const [modalAddTask, setModalAddTask] = useState<boolean>(false);

  const headerLogoStyle = classNames("sidebar-head", { hide: sidebarVisibility });
  const boardNameStyle = classNames("board-name-header", { "show-border": !sidebarVisibility });

  function deleteBoardHandler() {
    dispatch(deleteBoard(selectedBoard.id));
    setModalDeleteBoard(!modalDeleteBoard);
  }

  // !!!!!!!!! Logic to select first available Board after Board was deleted OR edited
  // !!!!!!!!! if Boards list is empty - assign to selectedBoard { id: 0, name: "" } to HIDE "Three dots menu" (regarding selected Board) in header
  const boards = useAppSelector((state) => state.mainData.boards);
  const selectedBoardExist = boards.find((board) => board.id === selectedBoard.id);

  useEffect(() => {
    const anyBoardExist = boards[0] ? true : false;

    if (!selectedBoardExist && anyBoardExist) {
      dispatch(selectBoard(boards[0]));
    } else if (!selectedBoardExist && selectedBoard.id !== 0) {
      dispatch(selectBoard({ id: 0, name: "" }));
    } else {
      if (selectedBoardExist)
        dispatch(selectBoard({ id: selectedBoardExist.id, name: selectedBoardExist.name }));
    }
  }, [boards]);

  const isAddTaskButtonActive =
    selectedBoardExist != undefined ? Boolean(selectedBoardExist.columnsIncluded.length) : false;

  return (
    <div className="main-block-header ">
      <div className={headerLogoStyle}>
        <div className="head-logo">
          <img src="./cra_kanban_board/img/logo.svg" alt="logo" />
        </div>
        <div className="head-text-logo"></div>
      </div>
      <div className={boardNameStyle}>
        <div className="board-name-wrapper">
          <div className="board-name-logo"></div>
          <div className="board-name">{selectedBoard.name}</div>
          <div className="board-name-arrow "></div>
        </div>

        <div className="board-menu-wrapper">
          <Button
            type={"add_hide"}
            disabled={!isAddTaskButtonActive}
            action={() => setModalAddTask(!modalEditBoard)}
          >
            + Add New Task
          </Button>

          <Button type={"mobile"} disabled action={() => console.log("ADD")}>
            +
          </Button>

          {selectedBoard.name && (
            <DotsMenu
              onEditText="Edit Board"
              onDeleteText="Delete Board"
              onEdit={() => setModalEditBoard(!modalEditBoard)}
              onDelete={() => setModalDeleteBoard(!modalDeleteBoard)}
            />
          )}
        </div>
      </div>

      <ModalWindow showModal={modalDeleteBoard} action={() => setModalDeleteBoard(!modalDeleteBoard)}>
        <ConfirmPlate
          type={"board"}
          itemName={selectedBoard.name}
          onConfirm={() => deleteBoardHandler()}
          onCancel={() => setModalDeleteBoard(!modalDeleteBoard)}
        />
      </ModalWindow>

      <ModalWindow showModal={modalEditBoard} action={() => setModalEditBoard(!modalEditBoard)}>
        <EditBoard modalClose={setModalEditBoard} />
      </ModalWindow>

      <ModalWindow showModal={modalAddTask} action={() => setModalAddTask(!modalAddTask)}>
        <AddTask modalClose={setModalAddTask} boardID={selectedBoard.id} />
      </ModalWindow>
    </div>
  );
};

export default Header;
