import "./style.css";

type ToggleSwitchProps = {
  action: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ToggleSwitch = ({ action }: ToggleSwitchProps) => {
  return (
    <div className="toggle-switch">
      <input className="checkbox-toggle" type="checkbox" id="checkbox-toggle" onChange={action} />
      <label htmlFor="checkbox-toggle"></label>
    </div>
  );
};

export default ToggleSwitch;
