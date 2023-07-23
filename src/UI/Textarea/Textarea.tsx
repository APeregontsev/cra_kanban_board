import "./style.css";
import classNames from "classnames";

type TextareaType = {
  empty?: boolean;
  placeholder: string;
  onInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
};

const Textarea = ({ empty, onInput, ...props }: TextareaType) => {
  const textareaStyle = classNames("textarea-text", { empty: empty });

  return <textarea className={textareaStyle} {...props} onInput={onInput}></textarea>;
};

export default Textarea;
