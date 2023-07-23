import "./style.css";

type CheckBoxType = { children: string; checked?: boolean; id: string; onCheck: () => void };

const CheckBox = ({ children, id, onCheck, ...props }: CheckBoxType) => {
  return (
    <div className="inner-task-subtask">
      <input className="checkbox-classic" type="checkbox" id={id} onChange={onCheck} {...props} />
      <label htmlFor={id}>{children}</label>
    </div>
  );
};

export default CheckBox;
