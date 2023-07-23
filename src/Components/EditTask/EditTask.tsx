import "./style.css";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import ModalSubTitle from "../../UI/ModalSubTitle/ModalSubTitle";
import ModalTitle from "../../UI/ModalTitle/ModalTitle";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { editTask } from "../../slices/data";
import { capitalizeFirstLetter } from "../../utils";
import Textarea from "../../UI/Textarea/Textarea";
import Select from "../../UI/Select/Select";
import { SelectOptionType } from "../../UI/Select/Select";
import {
  Board as BoardType,
  Task as TaskType,
  ID as IDType,
  Column as ColumnType,
  SubTask as SubTaskType,
} from "../../data";
import { EditTaskDataType } from "../../slices/data";

type InputsRenderType = { num: number; inputData: string; placeholder: string };

type AddTaskType = {
  modalClose: React.Dispatch<React.SetStateAction<boolean>>;
  taskID: number;
};

const EditTask = ({ modalClose, taskID }: AddTaskType) => {
  const boardID = 1;
  const dispatch = useAppDispatch();

  // Lets select Task to Edit
  const taskToEdit = useAppSelector(selectTaskToEdit);

  function selectTaskToEdit(state: any) {
    const task: TaskType = state.mainData.tasks.find((task: TaskType) => task.id === taskID);
    return task;
  }

  // Lets select subtasks of our Task to Edit and transform data for inputs for further rendering
  const subtasksToEdit = useAppSelector(selectSubtasksToEdit);

  function selectSubtasksToEdit(state: any) {
    const subtasksforRender: InputsRenderType[] = [];

    state.mainData.subtasks.forEach((subtask: SubTaskType) => {
      if (subtask.taskId !== taskID) return;

      const tempData = { num: subtask.id, inputData: subtask.name, placeholder: "" };
      subtasksforRender.push(tempData);
    });

    return subtasksforRender;
  }

  // Lets select available columns of the Tasks BOARD and transform data for Select Options for further rendering
  const { optionsForRender, currentOption } = useAppSelector(selectColumnsForSelect);

  function selectColumnsForSelect(state: any) {
    const task: TaskType = state.mainData.tasks.find((task: TaskType) => task.id === taskID);

    let columnsOfTasksBoard: IDType[] = [];

    state.mainData.boards.forEach((board: BoardType) => {
      if (board.id !== task.boardId) return;
      return (columnsOfTasksBoard = board.columnsIncluded);
    });

    const allColumnsInState: ColumnType[] = state.mainData.columns;

    const optionsForRender: SelectOptionType[] = [];
    const currentOption: SelectOptionType = { label: "", value: 0 };

    allColumnsInState.forEach((column: ColumnType) => {
      if (!columnsOfTasksBoard.includes(column.id)) return;

      // Lets prepare Option for Select that will be selected by default
      if (column.id === task.columnId) {
        currentOption.label = column.name;
        currentOption.value = column.id;
      }

      // Lets prepare List of Options for Select
      const tempData = { label: column.name, value: column.id };
      optionsForRender.push(tempData);
    });

    return { optionsForRender, currentOption };
  }

  // State for select
  const [selectValue, setSelectValue] = useState<SelectOptionType>(currentOption);

  // States for Inputs
  const [taskTitle, setTaskTitle] = useState<string>(taskToEdit.title);
  const [taskDescription, setTaskDescription] = useState<string | undefined>(taskToEdit.description);
  const [inputsForRender, setInputsForRender] = useState<InputsRenderType[]>(subtasksToEdit);

  function removeInput(num: number) {
    setInputsForRender([...inputsForRender.filter((input) => input.num !== num)]);
  }

  function addInput() {
    const newNum = inputsForRender.length ? inputsForRender[inputsForRender.length - 1].num + 1 : 1;
    const newInput: InputsRenderType = { num: newNum, inputData: "", placeholder: "Subtask name" };

    setInputsForRender([...inputsForRender, newInput]);
  }

  function taskTitleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setTaskTitle(e.target.value);
  }

  function taskDescriptionInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setTaskDescription(e.target.value);
  }

  function subtaskNameInput(e: React.ChangeEvent<HTMLInputElement>, id: number) {
    const inputData = e.target.value;
    const subtaskNameInput = inputsForRender.find((input) => input.num === id);

    if (subtaskNameInput) subtaskNameInput.inputData = inputData;

    setInputsForRender([...inputsForRender]);
  }

  function editTaskHandler() {
    // Let's check validity of all necessary fields exept Inputs for Subtasks

    const areAllFieldsValid = taskTitle && taskDescription && selectValue.value;
    if (!areAllFieldsValid) return;

    // Lets prepare data for dispatch

    const editedTaskData: EditTaskDataType = {
      taskTitle: capitalizeFirstLetter(taskTitle.toLowerCase()),
      taskDescription: capitalizeFirstLetter(taskDescription.toLowerCase()),
      taskID: taskID,
      columnID: selectValue.value,
      subtasks: [],
    };

    // Lets push names of subtasks from inputs
    if (inputsForRender.length)
      inputsForRender.forEach((inputData) => {
        editedTaskData.subtasks.push({
          subtaskID: inputData.num,
          subtaskName: capitalizeFirstLetter(inputData.inputData.toLowerCase()),
          placeholder: inputData.placeholder,
        });
      });

    dispatch(editTask(editedTaskData));
    modalClose(false);
  }

  return (
    <>
      <ModalTitle>Edit Task</ModalTitle>

      <div className="add-task-block-wrapper">
        <ModalSubTitle>Title</ModalSubTitle>

        <Input
          value={taskTitle}
          placeholder="e.g. Web Design"
          onInput={(e) => taskTitleInput(e)}
          empty={!Boolean(taskTitle)}
        />
      </div>

      <div className="add-task-block-wrapper">
        <ModalSubTitle>Description</ModalSubTitle>

        <Textarea
          value={taskDescription ? taskDescription : ""}
          placeholder="e.g. It’s always good to take a break. This 15 minute break will
recharge the batteries a little."
          onInput={(e) => taskDescriptionInput(e)}
          empty={!Boolean(taskDescription)}
        />
      </div>
      <ModalSubTitle>Subtasks</ModalSubTitle>
      <div className="add-task-block-wrapper list">
        {inputsForRender.map((input) => {
          return (
            <div key={input.num} className="add-task-input-wrapper">
              <Input
                value={input.inputData}
                placeholder={input.placeholder}
                onInput={(e) => subtaskNameInput(e, input.num)}
                empty={!Boolean(input.inputData)}
              />
              <Button type={"cross"} action={() => removeInput(input.num)}></Button>
            </div>
          );
        })}
      </div>

      <div className="add-task-block-wrapper">
        <Button type={"sub"} action={addInput}>
          + Add New Subtask
        </Button>
      </div>

      <div className="add-task-block-wrapper">
        <ModalSubTitle>Status</ModalSubTitle>

        <Select
          options={optionsForRender}
          value={selectValue}
          onChange={(option) => setSelectValue(option)}
        />
      </div>
      <Button type={"wide"} action={editTaskHandler}>
        Save Changes
      </Button>
    </>
  );
};

export default EditTask;
