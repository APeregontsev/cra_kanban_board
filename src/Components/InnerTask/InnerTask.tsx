import "./style.css";
import { useState } from "react";
import ModalSubTitle from "../../UI/ModalSubTitle/ModalSubTitle";
import { useAppSelector, useAppDispatch } from "../../store/store";
import Select from "../../UI/Select/Select";
import { SelectOptionType } from "./../../UI/Select/Select";
import DotsMenu from "../../UI/DotsMenu/DotsMenu";
import ConfirmPlate from "../../UI/ConfirmPlate/ConfirmPlate";
import ModalWindow from "../../UI/ModalWindow/ModalWindow";
import CheckBox from "../../UI/Checkbox/Checkbox";
import { SubTask } from "../../data";
import { toggleSubtaskDone, deleteTask, changeColumnInTask } from "../../slices/data";
import { Task as TaskType, Column as ColumnType, Board as BoardType } from "../../data";
import EditTask from "../EditTask/EditTask";

const InnerTask = ({ taskID }: { taskID: number }) => {
  const dispatch = useAppDispatch();

  const [modalDeleteTask, setModalDeleteTask] = useState<boolean>(false);
  const [modalEditTask, setModalEditTask] = useState<boolean>(false);

  const subtasks = useAppSelector((state) => state.mainData.subtasks);
  const subtasksForRender: SubTask[] = [...subtasks].filter((subtask) => subtask.taskId === taskID);

  const numberOfSubtasks: number = subtasksForRender.length;
  const numberOfCompletedSubtasks: number = [...subtasksForRender].filter((subtask) => subtask.done).length;

  // Options for select to display

  const currentTask = useAppSelector(selectCurrentTask);

  function selectCurrentTask(state: any) {
    const task: TaskType = state.mainData.tasks.find((task: TaskType) => task.id === taskID);
    if (task) return task;
  }

  const dataForSelect = useAppSelector(selectColumns);

  const activeValueForSelect = () => {
    if (currentTask)
      return dataForSelect.find((selectValue) =>
        currentTask ? selectValue.value === currentTask.columnId : false
      );
  };

  function selectColumns(state: any) {
    const activeBoard: BoardType = state.mainData.boards.find((board: BoardType) =>
      currentTask ? board.id === currentTask.boardId : false
    );

    const columns: ColumnType[] = state.mainData.columns;
    const resultData: { label: string; value: number }[] = [];
    const filteredColumns = columns.filter((existingColumn) =>
      activeBoard.columnsIncluded.includes(existingColumn.id)
    );

    filteredColumns.forEach((column) => {
      const tempData = { label: column.name, value: column.id };
      resultData.push(tempData);
    });

    return resultData;
  }

  // State for select
  const [selectValue, setSelectValue] = useState<SelectOptionType | undefined>(activeValueForSelect);

  function selectNewColumnHandler(option: SelectOptionType) {
    setSelectValue(option);
    dispatch(changeColumnInTask({ taskID: taskID, columnID: option.value }));
  }

  const subtasksText = numberOfSubtasks
    ? `Subtasks (${numberOfCompletedSubtasks} of ${numberOfSubtasks})`
    : "Subtasks : no subtasks";

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div className="inner-task-title-wrapper">
        <div className="inner-task-title-in">{currentTask ? currentTask.title : ""}</div>

        <DotsMenu
          onEditText="Edit Task"
          onDeleteText="Delete Task"
          onEdit={() => setModalEditTask(!modalEditTask)}
          onDelete={() => setModalDeleteTask(!modalDeleteTask)}
        />
      </div>
      <div className="inner-task-description">{currentTask ? currentTask.description : ""}</div>
      <div className="inner-task-subtasks-wrapper">
        <ModalSubTitle>{subtasksText}</ModalSubTitle>
      </div>
      <div className="inner-task-subtasks-body-wrapper">
        {subtasksForRender.map((subtask) => {
          return (
            <CheckBox
              key={subtask.id}
              onCheck={() => dispatch(toggleSubtaskDone(subtask.id))}
              id={subtask.name.slice(0, 15) + subtask.id}
              checked={subtask.done}
            >
              {subtask.name}
            </CheckBox>
          );
        })}
      </div>
      <div className="inner-task-current-status-wrapper">
        <ModalSubTitle>Current Status</ModalSubTitle>

        <Select
          options={dataForSelect}
          value={selectValue}
          onChange={(option) => selectNewColumnHandler(option)}
        />
      </div>

      <ModalWindow showModal={modalEditTask} action={() => setModalEditTask(!modalEditTask)}>
        <EditTask modalClose={setModalEditTask} taskID={taskID} />
      </ModalWindow>

      <ModalWindow showModal={modalDeleteTask} action={() => setModalDeleteTask(!modalDeleteTask)}>
        <ConfirmPlate
          type={"task"}
          itemName={currentTask ? currentTask.title : ""}
          onConfirm={() => dispatch(deleteTask(taskID))}
          onCancel={() => setModalDeleteTask(!modalDeleteTask)}
        />
      </ModalWindow>
    </div>
  );
};

export default InnerTask;
