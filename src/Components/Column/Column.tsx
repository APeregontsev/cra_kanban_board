import "./style.css";
import Task from "../../UI/Task/Task";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { Task as TaskType, Column as ColumnType } from "../../data";
import classNames from "classnames";
import { useState } from "react";
import { changeColumnOnDrag } from "../../slices/data";

const Column = ({ columnId }: { columnId: number }) => {
  const dispatch = useAppDispatch();

  const [dragOverHighlight, setDragOverHighlight] = useState<Boolean>(false);

  const tasks = useAppSelector((state) => state.mainData.tasks);
  const selectedBoard = useAppSelector((state) => state.selectedBoard);
  const columnName = useAppSelector(selectColumnName);

  const tasksForRender: TaskType[] = [...tasks].filter(
    (task) => task.columnId === columnId && task.boardId === selectedBoard.id
  );

  function selectColumnName(state: any): string {
    const column = state.mainData.columns.find((column: ColumnType) => column.id === columnId);
    return column ? column.name : undefined;
  }

  const numberOfTasks: number = tasksForRender.length;

  const columnDotStyle = classNames(
    "column-dot",
    { todo: columnName.toLowerCase() === "todo" },
    { done: columnName.toLowerCase() === "done" },
    { doing: columnName.toLowerCase() === "doing" }
  );

  // For drag-and-drop

  function onDropHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    setDragOverHighlight(false);
    dispatch(changeColumnOnDrag({ taskID: +data, newColumnID: columnId }));
  }

  function onDragOverHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOverHighlight(true);
  }

  function onDragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOverHighlight(false);
  }

  const highlightDragOverStyle = classNames("inner-column-wrapper", { highlight: dragOverHighlight });

  return (
    <div
      className="column-wrapper"
      onDragOver={(e) => onDragOverHandler(e)}
      onDrop={(e) => onDropHandler(e)}
      onDragLeave={(e) => onDragLeaveHandler(e)}
    >
      <div className="column-head">
        <div className={columnDotStyle}></div>
        <div className="column-name">{columnName}</div>
        <div className="column-items-number">({numberOfTasks})</div>
      </div>

      <div className={highlightDragOverStyle}>
        {tasksForRender.map((task) => (
          <Task key={task.id} taskId={task.id}>
            {task.title}
          </Task>
        ))}
      </div>
    </div>
  );
};

export default Column;
