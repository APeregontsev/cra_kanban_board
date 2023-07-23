import "./style.css";
import Button from "../Button/Button";

const BoardEmpty = ({ action }: { action: () => void }) => {
  return (
    <div className="board-empty-wrapper">
      <div className="empty-board-text">This board is empty. Create a new column to get started.</div>

      <Button type={"add"} action={action}>
        + Add New Column
      </Button>
    </div>
  );
};

export default BoardEmpty;
