import "./style.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

import { useMode } from "../../useMode";

const DarkModeSwich = () => {
  const mode = useMode();

  return (
    <div className="footer-switch ">
      <div className="day-switch">
        <img className="day_ico-img" src="./cra_kanban_board/img/day.svg" alt="day_ico" />
      </div>

      <ToggleSwitch action={mode.toggleDark} />

      <div className="night-switch">
        <img className="night_ico-img" src="./cra_kanban_board/img/night.svg" alt="night_ico" />
      </div>
    </div>
  );
};

export default DarkModeSwich;
