import "./style.css";
import { useAppSelector } from "../../store/store";
import { SubTask } from "../../data";
import ModalWindow from "../../UI/ModalWindow/ModalWindow";
import { useState } from "react";
import InnerTask from "../../Components/InnerTask/InnerTask";

type TaskProps = {
  children: string;
  taskId: number;
};

const Task = ({ children, taskId }: TaskProps) => {
  const [modalInnerTask, setModalInnerTask] = useState<boolean>(false);

  const subtasks = useAppSelector((state) => state.mainData.subtasks);
  const subtasksForRender: SubTask[] = [...subtasks].filter((subtask) => subtask.taskId === taskId);

  const numberOfSubtasks: number = subtasksForRender.length;
  const numberOfCompletedSubtasks: number = [...subtasksForRender].filter((subtask) => subtask.done).length;

  // For drag-and-drop
  function onDragStartHandler(e: React.DragEvent<HTMLDivElement>) {
    e.dataTransfer.clearData();
    e.dataTransfer.setData("text/plain", taskId.toString());
  }

  return (
    <div
      className="task-wrapper"
      onClick={() => setModalInnerTask(!modalInnerTask)}
      draggable
      onDragStart={(e) => onDragStartHandler(e)}
    >
      <div className="left-column">
        <div className="task-title">{children}</div>
        <div className="task-body">
          {numberOfSubtasks !== 0 ? (
            <>
              <div className="completed-subtasks">{numberOfCompletedSubtasks}</div>
              <div>of</div>
            </>
          ) : null}

          <div className="total-subtasks">{numberOfSubtasks}</div>
          <div>substasks</div>
        </div>
      </div>
      <div className="drag-zone-column"></div>

      <ModalWindow showModal={modalInnerTask} action={() => setModalInnerTask(!modalInnerTask)}>
        <InnerTask taskID={taskId} />
      </ModalWindow>
    </div>
  );
};

export default Task;
