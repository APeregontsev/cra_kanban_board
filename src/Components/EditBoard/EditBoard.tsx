import "./style.css";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import ModalSubTitle from "../../UI/ModalSubTitle/ModalSubTitle";
import ModalTitle from "../../UI/ModalTitle/ModalTitle";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { editBoard } from "../../slices/data";
import { capitalizeFirstLetter } from "../../utils";
import { Board as BoardType, Column as ColumnType } from "../../data";
import { EditedBoardDataType } from "../../slices/data";

type InputsRenderType = { num: number; inputData: string; placeholder: string };

const EditBoard = ({ modalClose }: { modalClose: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const dispatch = useAppDispatch();
  const selectedBoard = useAppSelector((state) => state.selectedBoard);
  const columnsForRender = useAppSelector(selectColumns);

  function selectColumns(state: any) {
    const activeBoard: BoardType = state.mainData.boards.find(
      (board: BoardType) => board.id === selectedBoard.id
    );
    const columnsInBoard = activeBoard.columnsIncluded;
    const columnsForRender: ColumnType[] = state.mainData.columns.filter((column: ColumnType) =>
      columnsInBoard.includes(column.id)
    );

    // Lets prepare data for further inputs render
    const outputData: InputsRenderType[] = columnsForRender.map((column) => ({
      num: column.id,
      inputData: column.name,
      placeholder: "",
    }));

    return outputData;
  }

  const [boardName, setBoardName] = useState(selectedBoard.name);
  const [inputsForRender, setInputsForRender] = useState<InputsRenderType[]>(columnsForRender);

  // Functions

  function removeInput(num: number) {
    setInputsForRender([...inputsForRender.filter((input) => input.num !== num)]);
  }

  function addInput() {
    const newNum = inputsForRender.length ? inputsForRender[inputsForRender.length - 1].num + 1 : 1;
    const newInput: InputsRenderType = { num: newNum, inputData: "", placeholder: "New column name" };
    setInputsForRender([...inputsForRender, newInput]);
  }

  function boardNameInput(e: React.ChangeEvent<HTMLInputElement>) {
    setBoardName(e.target.value);
  }

  function columnNameInput(e: React.ChangeEvent<HTMLInputElement>, id: number) {
    const inputData = e.target.value;
    const columnNameInput = inputsForRender.find((input) => input.num === id);
    if (columnNameInput) columnNameInput.inputData = capitalizeFirstLetter(inputData.toLowerCase());
    setInputsForRender([...inputsForRender]);
  }

  function editBoardHandler() {
    // Let's check validity of all necessary fields
    const allInputsValid = inputsForRender.every((inputData) => inputData.inputData);
    const areAllFieldsValid = boardName && allInputsValid;
    if (!areAllFieldsValid) return;

    // Lets prepare data for dispatch
    const newBoardData: EditedBoardDataType = {
      boardID: selectedBoard.id,
      boardName: capitalizeFirstLetter(boardName.toLowerCase()),
      columns: inputsForRender,
    };

    dispatch(editBoard(newBoardData));
    modalClose(false);
  }

  return (
    <>
      <ModalTitle>Edit Board</ModalTitle>

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

      <div className="add-task-block-wrapper">
        <Button type={"sub"} action={addInput}>
          + Add New Column
        </Button>
      </div>

      <Button type={"wide"} action={editBoardHandler}>
        Save Changes
      </Button>
    </>
  );
};

export default EditBoard;
