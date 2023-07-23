import "./style.css";
import classNames from "classnames";

type InputType = {
  empty?: boolean;
  placeholder: string;
  onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

const Input = ({ empty, onInput, ...props }: InputType) => {
  const inputStyle = classNames("input-text", { empty: empty });

  return <input type="text" className={inputStyle} {...props} onInput={onInput} />;
};

export default Input;
