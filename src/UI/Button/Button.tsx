import "./style.css";
import classNames from "classnames";

type ButtonProps = {
  children?: string;
  type: "add" | "mobile" | "cross" | "wide" | "sub" | "delete" | "cancel" | "add_hide";
  disabled?: boolean;
  action: () => void;
};

const Button = ({ children, type, disabled, action }: ButtonProps) => {
  const buttonStyle = classNames(
    "general-btn",
    { add: type === "add" },
    { "add hideable": type === "add_hide" },
    { "add mobile": type === "mobile" },
    { cross: type === "cross" },
    { "add wide": type === "wide" },
    { "add sub wide": type === "sub" },
    { delete: type === "delete" },
    { cancel: type === "cancel" },
    { disabled: disabled }
  );

  return (
    <button className={buttonStyle} onClick={action} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
