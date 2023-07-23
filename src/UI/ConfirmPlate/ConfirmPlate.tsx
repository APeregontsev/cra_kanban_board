import "./style.css";
import Button from "../Button/Button";

type ConfirmPlateType = {
  type: "board" | "task";
  itemName: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmPlate = ({ type, itemName, onConfirm, onCancel }: ConfirmPlateType) => {
  const deleteBoardText =
    "Are you sure you want to delete the ‘" +
    itemName +
    "’ board? This action will remove all columns and tasks and cannot be reversed.";

  const deleteTaskText =
    "Are you sure you want to delete the ‘" +
    itemName +
    "’ task and its subtasks? This action cannot be reversed.";

  const plateText = type === "board" ? deleteBoardText : deleteTaskText;

  return (
    <>
      <div className="add-task-title red">Delete this {type}?</div>
      <div className="inner-task-description">{plateText}</div>
      <div className="buttons-wrapper">
        <Button type={"delete"} action={onConfirm}>
          Delete
        </Button>
        <Button type={"cancel"} action={onCancel}>
          Cancel
        </Button>
      </div>
    </>
  );
};

export default ConfirmPlate;
