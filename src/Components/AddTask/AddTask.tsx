import "./style.css";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import ModalSubTitle from "../../UI/ModalSubTitle/ModalSubTitle";
import ModalTitle from "../../UI/ModalTitle/ModalTitle";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { addTask } from "../../slices/data";
import { capitalizeFirstLetter } from "../../utils";
import Textarea from "../../UI/Textarea/Textarea";
import Select from "../../UI/Select/Select";
import { SelectOptionType } from "./../../UI/Select/Select";
import { Board as BoardType, Column as ColumnType } from "../../data";
import { NewTaskDataType } from "../../slices/data";

type InputsRenderType = { num: number; inputData: string; placeholder: string };
type AddTaskType = {
  modalClose: React.Dispatch<React.SetStateAction<boolean>>;
  boardID: number;
};

const AddTask = ({ modalClose, boardID }: AddTaskType) => {
  const dispatch = useAppDispatch();

  // Lets prepare data for select Options to show
  const dataForSelect = useAppSelector(selectColumns);

  function selectColumns(state: any) {
    const activeBoard: BoardType = state.mainData.boards.find((board: BoardType) => board.id === boardID);
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

  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [inputsForRender, setInputsForRender] = useState<InputsRenderType[]>([
    { num: 1, inputData: "", placeholder: "e.g. Make Coffee" },
    { num: 2, inputData: "", placeholder: "e.g. Drink coffee & smile" },
  ]);

  // State for select
  const [selectValue, setSelectValue] = useState<SelectOptionType>({
    label: "Press to choose",
    value: 0,
  });

  function removeInput(num: number) {
    setInputsForRender([...inputsForRender.filter((input) => input.num !== num)]);
  }

  function addInput() {
    const newNum = inputsForRender.length ? inputsForRender[inputsForRender.length - 1].num + 1 : 1;
    const newInput: InputsRenderType = { num: newNum, inputData: "", placeholder: "e.g. Subtask name" };

    setInputsForRender([...inputsForRender, newInput]);
  }

  function taskNameInput(e: React.ChangeEvent<HTMLInputElement>) {
    setTaskName(e.target.value);
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

  function createTaskHandler() {
    // Let's check validity of all necessary fields

    const allInputsValid = inputsForRender.every((inputData) => inputData.inputData);
    const areAllFieldsValid = taskName && taskDescription && allInputsValid && selectValue.value;
    if (!areAllFieldsValid) return;

    // Lets prepare data for dispatch

    const newTaskData: NewTaskDataType = {
      taskTitle: capitalizeFirstLetter(taskName.toLowerCase()),
      taskDescription: capitalizeFirstLetter(taskDescription.toLowerCase()),
      boardID: boardID,
      columnID: selectValue.value,
      subtasks: [],
    };

    // Lets push names of subtasks from inputs
    inputsForRender.forEach((inputData) => {
      newTaskData.subtasks.push(capitalizeFirstLetter(inputData.inputData.toLowerCase()));
    });

    dispatch(addTask(newTaskData));
    modalClose(false);
  }

  return (
    <>
      <ModalTitle>Add New Task</ModalTitle>

      <div className="add-task-block-wrapper">
        <ModalSubTitle>Title</ModalSubTitle>

        <Input
          value={taskName}
          placeholder="e.g. Web Design"
          onInput={(e) => taskNameInput(e)}
          empty={!Boolean(taskName)}
        />
      </div>

      <div className="add-task-block-wrapper">
        <ModalSubTitle>Description</ModalSubTitle>

        <Textarea
          value={taskDescription}
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

        <Select options={dataForSelect} value={selectValue} onChange={(option) => setSelectValue(option)} />
      </div>
      <Button type={"wide"} action={createTaskHandler}>
        Create Task
      </Button>
    </>
  );
};

export default AddTask;
