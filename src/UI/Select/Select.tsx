import "./style.css";
import { useEffect, useState } from "react";
import classNames from "classnames";

export type SelectOptionType = {
  label: string;
  value: number;
};

type SelectProps = {
  options: SelectOptionType[];
  multiple?: false;
  value: SelectOptionType | undefined;
  onChange: (value: SelectOptionType) => void;
};

// main function

const Select = ({ value, onChange, options }: SelectProps) => {
  // states
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  // inner functions

  function selectOption(option: SelectOptionType) {
    if (option !== value) onChange(option);
  }

  function isOptionSelected(option: SelectOptionType) {
    return option === value;
  }

  // lets reset highlighted item to first

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  return (
    <div
      tabIndex={0}
      className={`${"container"} ${value ? (value.value === 0 ? "empty" : "") : ""}`}
      onClick={() => setIsOpen((prev) => !prev)}
      onBlur={() => setIsOpen(false)}
    >
      <span className="value">{value?.label}</span>

      <div className="caret"></div>

      <ul className={`${"options"} ${isOpen ? "show" : ""}`}>
        {options.map((option, index) => (
          <li
            key={option.label}
            // стили
            className={classNames("option", {
              selected: isOptionSelected(option),
              highlighted: index === highlightedIndex,
            })}
            // стили
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
