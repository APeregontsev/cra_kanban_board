import "./style.css";

const NewColumn = ({ action }: { action: () => void }) => {
  return (
    <div className="new-column-wrapper">
      <div className="column-head">
        <div className="column-dot-not"></div>
        <div className="column-name"></div>
        <div className="column-items-number"></div>
      </div>

      <div className="new-column-body">
        <div className="new-column-text" onClick={action}>
          + New Column
        </div>
      </div>
    </div>
  );
};

export default NewColumn;
