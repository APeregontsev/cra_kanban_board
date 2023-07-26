import "./style.css";
import DarkModeSwich from "../../UI/DarkmodeSwich/DarkmodeSwich";
import MenuItem from "../../UI/MenuItem/MenuItem";
import classNames from "classnames";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { selectBoard } from "../../slices/selectedBoard";
import ModalWindow from "../../UI/ModalWindow/ModalWindow";
import AddBoard from "../AddBoard/AddBoard";
import { useMode } from "../../useMode";

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const [modalAddBoard, setModalAddBoard] = useState<boolean>(false);

  const boards = useAppSelector((state) => state.mainData.boards);
  const numberOfBoard = boards.length;
  const selectedBoard = useAppSelector((state) => state.selectedBoard);

  // Mode
  const mode = useMode();

  // Styles
  const sidebarWrapperStyle = classNames("sidebar-wrapper", { hide: !mode.sidebar });

  return (
    <div className={sidebarWrapperStyle}>
      <div className="sidebar">
        <div className="sidebar-head">
          <div className="head-logo">
            <img src="./img/logo.svg" alt="logo" />
          </div>
          <div className="head-text-logo "></div>
        </div>

        <div className="sidebar-body">
          <div className="body-header">
            <div className="body-header-text">All Boards</div>
            <div className="body-header-number">({numberOfBoard})</div>
          </div>

          <div className="boards-main">
            <div className="boards-items-wrapper">
              {boards.map((board, index) => {
                return (
                  <MenuItem
                    key={index}
                    active={board.id === selectedBoard.id}
                    onClick={() => dispatch(selectBoard({ id: board.id, name: board.name }))}
                  >
                    {board.name}
                  </MenuItem>
                );
              })}
            </div>

            <MenuItem onClick={() => setModalAddBoard(!modalAddBoard)} type={"add"}>
              + Create New Board
            </MenuItem>
          </div>
        </div>

        <div className="sidebar-footer">
          <DarkModeSwich />

          <MenuItem onClick={mode.toggleSideBar} type={"hide"}>
            Hide Sidebar
          </MenuItem>
        </div>
      </div>

      <ModalWindow showModal={modalAddBoard} action={() => setModalAddBoard(!modalAddBoard)}>
        <AddBoard modalClose={setModalAddBoard} />
      </ModalWindow>
    </div>
  );
};

export default Sidebar;
