import "./style.css";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import ModalSubTitle from "../../UI/ModalSubTitle/ModalSubTitle";
import ModalTitle from "../../UI/ModalTitle/ModalTitle";
import { useState } from "react";
import { useAppDispatch } from "../../store/store";
import { addColumn } from "../../slices/data";
import { capitalizeFirstLetter } from "../../utils";
import { AddColumnType } from "../../slices/data";

type AddColumnPropsType = { boardID: number; modalClose: React.Dispatch<React.SetStateAction<boolean>> };

const AddColumn = ({ boardID, modalClose }: AddColumnPropsType) => {
  const dispatch = useAppDispatch();
  const [columnName, setColumnName] = useState<string>("");

  function columnNameInput(e: React.ChangeEvent<HTMLInputElement>) {
    setColumnName(e.target.value);
  }

  function createColumnHandler() {
    // Let's check validity input
    if (!columnName) return;

    // Lets prepare data for dispatch
    const newColumnData: AddColumnType = {
      boardID: boardID,
      columnName: capitalizeFirstLetter(columnName.toLowerCase()),
    };

    dispatch(addColumn(newColumnData));
    modalClose(false);
  }

  return (
    <>
      <ModalTitle>Add New Column</ModalTitle>

      <div className="add-task-block-wrapper">
        <ModalSubTitle>Column Name</ModalSubTitle>

        <Input
          value={columnName}
          placeholder="e.g. Web Design"
          onInput={(e) => columnNameInput(e)}
          empty={!Boolean(columnName)}
        />
      </div>

      <Button type={"wide"} action={createColumnHandler}>
        Create New Column
      </Button>
    </>
  );
};

export default AddColumn;
