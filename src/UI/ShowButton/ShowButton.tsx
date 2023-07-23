import "./style.css";
import classNames from "classnames";
import { useMode } from "../../useMode";

type SHowButtonProps = {
  // mode: ModeType;
  // setMode: (arg: ModeType) => void;
};

const ShowButton = ({}: SHowButtonProps) => {
  const mode = useMode();

  const showButtonStyle = classNames("show-button", { hide: mode.sidebar });

  return (
    <div className={showButtonStyle} onClick={mode.toggleSideBar}>
      <img src="./img/show_icon.svg" alt="show_sidebar" />
    </div>
  );
};

export default ShowButton;
