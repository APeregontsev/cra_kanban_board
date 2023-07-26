import "./style.css";
import DarkModeSwich from "../../UI/DarkmodeSwich/DarkmodeSwich";
import MenuItem from "../../UI/MenuItem/MenuItem";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { selectBoard } from "../../slices/selectedBoard";
import ModalWindow from "../../UI/ModalWindow/ModalWindow";
import AddBoard from "../AddBoard/AddBoard";

const SidebarPopup = ({
  setModalAddPopupMenu,
}: {
  setModalAddPopupMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();

  const [modalAddBoard, setModalAddBoard] = useState<boolean>(false);

  const boards = useAppSelector((state) => state.mainData.boards);
  const numberOfBoard = boards.length;
  const selectedBoard = useAppSelector((state) => state.selectedBoard);

  return (
    <div className="sidebar-wrapper-pop">
      <div className="sidebar-pop">
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
                    onClick={() => {
                      setModalAddPopupMenu(false);
                      dispatch(selectBoard({ id: board.id, name: board.name }));
                    }}
                  >
                    {board.name}
                  </MenuItem>
                );
              })}
            </div>
            <br></br>
          </div>
        </div>

        <div className="sidebar-footer">
          <DarkModeSwich />
        </div>
      </div>

      <ModalWindow showModal={modalAddBoard} action={() => setModalAddBoard(!modalAddBoard)}>
        <AddBoard modalClose={setModalAddBoard} />
      </ModalWindow>
    </div>
  );
};

export default SidebarPopup;
