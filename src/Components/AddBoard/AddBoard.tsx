import "./style.css";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import ModalSubTitle from "../../UI/ModalSubTitle/ModalSubTitle";
import ModalTitle from "../../UI/ModalTitle/ModalTitle";
import { useState } from "react";
import { useAppDispatch } from "../../store/store";
import { addBoard } from "../../slices/data";
import { capitalizeFirstLetter } from "../../utils";
import { NewBoardDataType } from "../../slices/data";

type InputsRenderType = { num: number; inputData: string; placeholder: string };

const AddBoard = ({ modalClose }: { modalClose: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const dispatch = useAppDispatch();

  const [boardName, setBoardName] = useState<string>("");
  const [inputsForRender, setInputsForRender] = useState<InputsRenderType[]>([
    { num: 1, inputData: "", placeholder: "e.g. Todo" },
    { num: 2, inputData: "", placeholder: "e.g. Doing" },
    { num: 3, inputData: "", placeholder: "e.g. Done" },
  ]);

  function removeInput(num: number) {
    setInputsForRender([...inputsForRender.filter((input) => input.num !== num)]);
  }

  function addInput() {
    const newNum = inputsForRender.length ? inputsForRender[inputsForRender.length - 1].num + 1 : 1;
    const newInput: InputsRenderType = { num: newNum, inputData: "", placeholder: "e.g. Column name" };

    setInputsForRender([...inputsForRender, newInput]);
  }

  function boardNameInput(e: React.ChangeEvent<HTMLInputElement>) {
    setBoardName(e.target.value);
  }

  function columnNameInput(e: React.ChangeEvent<HTMLInputElement>, id: number) {
    const inputData = e.target.value;
    const columnNameInput = inputsForRender.find((input) => input.num === id);

    if (columnNameInput) columnNameInput.inputData = inputData;

    setInputsForRender([...inputsForRender]);
  }

  function createBoardHandler() {
    // Let's check validity of all necessary fields

    const allInputsValid = inputsForRender.every((inputData) => inputData.inputData);
    const areAllFieldsValid = boardName && allInputsValid;
    if (!areAllFieldsValid) return;

    // Lets prepare data for dispatch
    const newBoardData: NewBoardDataType = { name: "", columns: [] };

    newBoardData.name = capitalizeFirstLetter(boardName.toLowerCase());

    inputsForRender.forEach((inputData) => {
      newBoardData.columns.push(capitalizeFirstLetter(inputData.inputData.toLowerCase()));
    });

    dispatch(addBoard(newBoardData));
    modalClose(false);
  }

  return (
    <>
      <ModalTitle>Add New Board</ModalTitle>

      <div className="add-task-block-wrapper">
        <ModalSubTitle>Board Name</ModalSubTitle>

        <Input
          value={boardName}
          placeholder="e.g. Web Design"
          onInput={(e) => boardNameInput(e)}
          empty={!Boolean(boardName)}
        />
      </div>
      <ModalSubTitle>Board Columns</ModalSubTitle>
      <div className="add-task-block-wrapper list">
        {inputsForRender.map((input) => {
          return (
            <div key={input.num} className="add-task-input-wrapper">
              <Input
                value={input.inputData}
                placeholder={input.placeholder}
                onInput={(e) => columnNameInput(e, input.num)}
                empty={!Boolean(input.inputData)}
              />
              <Button type={"cross"} action={() => removeInput(input.num)}></Button>
            </div>
          );
        })}
      </div>

      <div className="add-task-block-wrapper ">
        <Button type={"sub"} action={addInput}>
          + Add New Column
        </Button>
      </div>

      <Button type={"wide"} action={createBoardHandler}>
        Create New Board
      </Button>
    </>
  );
};

export default AddBoard;
