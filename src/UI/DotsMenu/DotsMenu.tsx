import "./style.css";
import { useEffect, useRef, useState } from "react";

type DotsMenuProps = {
  active?: boolean;
  onEditText: string;
  onDeleteText: string;
  onEdit: (event: React.MouseEvent) => void;
  onDelete: (event: React.MouseEvent) => void;
};

const DotsMenu = ({ active, onEditText, onDeleteText, onEdit, onDelete }: DotsMenuProps) => {
  const [isMenuShown, setIsMenuShown] = useState<boolean>(false);

  return (
    <div className="dots-wrapper" onClick={() => setIsMenuShown(!isMenuShown)}>
      {isMenuShown && (
        <DropDownMenu
          onEditText={onEditText}
          onDeleteText={onDeleteText}
          onEdit={onEdit}
          onDelete={onDelete}
          setIsMenuShown={setIsMenuShown}
        />
      )}
    </div>
  );
};

const DropDownMenu = ({
  onEditText,
  onDeleteText,
  onEdit,
  onDelete,
  setIsMenuShown,
}: DotsMenuProps & { setIsMenuShown: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const ref = useRef<HTMLDivElement>(null);

  // To close DROPDOWN menu on outside CLICK
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsMenuShown(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dots-menu-wrapper active" ref={ref}>
      <p className="edit-board-btn" onClick={onEdit}>
        {onEditText}
      </p>
      <p className="delete-board-btn" onClick={onDelete}>
        {onDeleteText}
      </p>
    </div>
  );
};

export default DotsMenu;
