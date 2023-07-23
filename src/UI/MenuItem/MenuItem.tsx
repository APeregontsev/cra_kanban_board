import "./style.css";
import classNames from "classnames";

type MenuItemProps = {
  children: string;
  type?: "active" | "add" | "hide";
  active?: boolean;
  onClick: (event: React.MouseEvent) => void;
};

const MenuItem = ({ children, type, active, onClick }: MenuItemProps) => {
  const MenuItemStyle = classNames(
    "board-item",
    { active: active },
    { add: type === "add" },
    { "hide-sidebar": type === "hide" }
  );

  return (
    <div className={MenuItemStyle} onClick={onClick}>
      <div className="board-item-icon"></div>
      <div className="board-item-name">{children}</div>
    </div>
  );
};

export default MenuItem;
