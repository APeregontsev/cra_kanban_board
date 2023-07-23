import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { data, ID } from "../data";

export type NewBoardDataType = { name: string; columns: string[] };
export type InputsRenderType = { num: number; inputData: string; placeholder: string };
export type EditedBoardDataType = { boardID: number; boardName: string; columns: InputsRenderType[] };
export type NewTaskDataType = {
  taskTitle: string;
  taskDescription: string;
  boardID: number;
  columnID: number;
  subtasks: string[];
};
export type EditTaskDataType = {
  taskTitle: string;
  taskDescription: string;
  taskID: number;
  columnID: number;
  subtasks: { subtaskID: number; subtaskName: string; placeholder: string }[];
};
export type AddColumnType = { boardID: ID; columnName: string };
export type ChangeColumnOnDragType = { taskID: number; newColumnID: number };

const initialState = data;

const mainDataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addBoard(state, action: PayloadAction<NewBoardDataType>) {
      const newBoardName = action.payload.name;
      const newColumns = action.payload.columns;
      const columnsIdsOfNewBoard: number[] = [];

      // Lets check if newColumns already exist in the list of existing ones (if so - add its ID to columnsIdsOfNewBoard),
      // if not - add newColumn to state (and its Id to columnsIdsOfNewBoard)

      newColumns.forEach((newColumn) => {
        const isColumnFound = state.columns.find((existingColumn) => existingColumn.name === newColumn);

        if (isColumnFound) {
          columnsIdsOfNewBoard.push(isColumnFound.id);
          return;
        } else {
          const newId = state.columns.length ? state.columns[state.columns.length - 1].id + 1 : 0;
          columnsIdsOfNewBoard.push(newId);
          const addColumn = { id: newId, name: newColumn };
          state.columns.push(addColumn);
        }
      });

      // Lets prepare new Board entry to add it to State

      const newBoardId = state.boards.length ? state.boards[state.boards.length - 1].id + 1 : 1;
      const newBoardEntry = {
        id: newBoardId,
        name: newBoardName,
        columnsIncluded: [...columnsIdsOfNewBoard],
      };

      // Lets update global state with new Board entry
      state.boards.push(newBoardEntry);

      console.log("************* DISPATCH columnsIdsOfNewBoard", columnsIdsOfNewBoard);
    },

    deleteBoard(state, action: PayloadAction<number>) {
      // In payload Board ID
      // Removal of Board by its ID
      const newBoarsList = state.boards.filter((board) => board.id !== action.payload);

      // Removal of Boards' TASKS
      const newTasksList = state.tasks.filter((task) => task.boardId !== action.payload);

      // Removal of Boards' SUBTASKS
      // lets find all tasks' IDs which subtasks we need to remove
      const tasksIds: number[] = state.tasks
        .filter((task) => task.boardId === action.payload)
        .map((task) => task.id);

      const newSubTasksList = state.subtasks.filter((subtask) => !tasksIds.includes(subtask.taskId));

      // Lets update global state with new Board/Tasks/Subtasks entries
      state.boards = newBoarsList;
      state.tasks = newTasksList;
      state.subtasks = newSubTasksList;
    },

    editBoard(state, action: PayloadAction<EditedBoardDataType>) {
      // Lets find the INDEX of our Board in the State

      let indexOfEditedBoard = 0;

      state.boards.forEach((board, index) => {
        if (board.id === action.payload.boardID) indexOfEditedBoard = index;
      });

      // Lets change name of the Board (by it Index that we found before)
      state.boards[indexOfEditedBoard].name = action.payload.boardName;

      // Lets change columns names

      const existingColumns = [...state.columns];
      const newColumns = action.payload.columns;

      // 1) Lets change names of the columns in the STATE

      // Array of Column IDs to add to our Board
      const newColumnsArray: number[] = [];

      newColumns.forEach((newColumn) => {
        if (!newColumn.placeholder) {
          // We found column in the state to edit
          const columnInState = existingColumns.find((existingColumn) => existingColumn.id === newColumn.num);

          if (columnInState) columnInState.name = newColumn.inputData;
          newColumnsArray.push(newColumn.num);
        } else {
          // New column is not present in State so lets add it to State columns

          const newId = existingColumns[existingColumns.length - 1].id + 1;
          const addNewColumn = { id: newId, name: newColumn.inputData };
          existingColumns.push(addNewColumn);
          newColumnsArray.push(newId);
        }
      });

      // 2) Lets update State with new columns data

      state.columns = existingColumns;

      // Lets update columns list of the Edited Board in the state

      state.boards[indexOfEditedBoard].columnsIncluded = newColumnsArray;
    },

    addTask(state, action: PayloadAction<NewTaskDataType>) {
      console.log("************* DISPATCH A D D TASK", action);

      // Lets prepare new task data to push it to the State
      const newTaskId = state.tasks.length ? state.tasks[state.tasks.length - 1].id + 1 : 1;
      const newTaskData = {
        id: newTaskId,
        boardId: action.payload.boardID,
        columnId: action.payload.columnID,
        title: action.payload.taskTitle,
        description: action.payload.taskDescription,
      };

      // lets add new task to the State

      state.tasks.push(newTaskData);

      // Lets prepare new SUBTASKS data and push it to the State

      let lastSubtaskID: number = state.subtasks.length ? state.subtasks[state.subtasks.length - 1].id : 0;

      if (action.payload.subtasks.length)
        action.payload.subtasks.forEach((newSubtask) => {
          const tempData = {
            id: lastSubtaskID + 1,
            taskId: newTaskId,
            name: newSubtask,
            done: false,
          };

          lastSubtaskID++;

          state.subtasks.push(tempData);
        });
    },
    deleteTask(state, action: PayloadAction<ID>) {
      // Lets filter tasks[] in the State to remove necessary task
      const newTasksList = state.tasks.filter((task) => task.id !== action.payload);

      // Lets update State with new Tasks list
      state.tasks = newTasksList;
    },

    toggleSubtaskDone(state, action: PayloadAction<ID>) {
      state.subtasks.forEach((subtask) => {
        if (subtask.id === action.payload) return (subtask.done = !subtask.done);
      });
    },

    changeColumnInTask(state, action: PayloadAction<{ taskID: ID; columnID: ID }>) {
      state.tasks.forEach((task) => {
        if (task.id === action.payload.taskID) return (task.columnId = action.payload.columnID);
      });
    },

    editTask(state, action: PayloadAction<EditTaskDataType>) {
      console.log("******************* Dispatch EDIT TASK", action);

      // Lets change Title, Description, ColumnID (Status) of selected task
      state.tasks.forEach((existingTask) => {
        if (existingTask.id !== action.payload.taskID) return;
        existingTask.title = action.payload.taskTitle;
        existingTask.description = action.payload.taskDescription;
        existingTask.columnId = action.payload.columnID;
      });

      // Lets determine last ID of subtask in the state
      let lastIDofSubtask = state.subtasks.length ? state.subtasks[state.subtasks.length - 1].id : 0;

      // If array with edited subtask is empty - we need to delete subtasks of Selected task
      if (!action.payload.subtasks.length) {
        const newSubtasksList = state.subtasks.filter((subtask) => subtask.taskId !== action.payload.taskID);
        state.subtasks = newSubtasksList;
      } else {
        // Lets select all subtasks, make changes in them and return to the State
        let existingSubtasks = [...state.subtasks];

        // Lets find subtasks that were DELETED

        let deletedSubtasksId: number[] = [];

        existingSubtasks.forEach((existingSubtask) => {
          const foundNewSubtask = action.payload.subtasks.find(
            (newSubtask) => newSubtask.subtaskID === existingSubtask.id && !newSubtask.placeholder
          );

          if (foundNewSubtask) return;
          if (existingSubtask.taskId === action.payload.taskID) deletedSubtasksId.push(existingSubtask.id);
        });

        console.log("******************* deletedSubtasksId", deletedSubtasksId);

        // Lets remove from list of existing subtasks, subtasks that where deleted according -- if the present in deletedSubtasksId[]
        if (deletedSubtasksId.length) {
          existingSubtasks = existingSubtasks.filter(
            (existingSubtask) => !deletedSubtasksId.includes(existingSubtask.id)
          );
        }

        // Lets change names in subtasks that already present in the State or add new Subtasks
        action.payload.subtasks.forEach((newSubtask) => {
          //
          // If placeholder field is present = new subtask

          if (!newSubtask.placeholder) {
            const foundExistingSubtask = existingSubtasks.find(
              (existingSubtask) => existingSubtask.id === newSubtask.subtaskID
            );
            if (!foundExistingSubtask) return;

            foundExistingSubtask.name = newSubtask.subtaskName;
          } else {
            const tempData = {
              id: lastIDofSubtask + 1,
              taskId: action.payload.taskID,
              name: newSubtask.subtaskName,
              done: false,
            };
            console.log("******************** AAAAAdddd tempData", tempData);
            // Add new subtask to list for further updating State
            existingSubtasks.push(tempData);
            lastIDofSubtask++;
          }
        });

        // Lets update State with updated subtasks list
        state.subtasks = existingSubtasks;
      }
    },

    addColumn(state, action: PayloadAction<AddColumnType>) {
      let columnIdToBoard: number = 0;

      // Lets check if newColumn name already exist in the list of existing columns in the State (if so - add its ID to columnsIdsOfBoard),
      // if not - add newColumn to state (and its Id = columnIdToBoard)

      const isColumnFound = state.columns.find(
        (existingColumn) => existingColumn.name === action.payload.columnName
      );

      if (isColumnFound) {
        // Add found in the State columns' ID to columnsIdsOfBoard[]
        columnIdToBoard = isColumnFound.id;
      } else {
        // Lets create new column entry and add id to the State
        const newColumnId = state.columns.length ? state.columns[state.columns.length - 1].id + 1 : 0;

        const addNewColumn = { id: newColumnId, name: action.payload.columnName };
        state.columns.push(addNewColumn);
        // Assign new Column ID to columnIdToBoard
        columnIdToBoard = newColumnId;
      }

      // Lets ADD ID of new column to the Board in the State
      state.boards.forEach((board) => {
        if (board.id !== action.payload.boardID) return;
        if (columnIdToBoard) board.columnsIncluded.push(columnIdToBoard);
      });
    },

    changeColumnOnDrag(state, action: PayloadAction<ChangeColumnOnDragType>) {
      state.tasks.forEach((task) => {
        if (task.id !== action.payload.taskID) return;
        task.columnId = action.payload.newColumnID;
      });
    },
  },
});

export const {
  addBoard,
  deleteBoard,
  editBoard,
  addTask,
  editTask,
  deleteTask,
  toggleSubtaskDone,
  changeColumnInTask,
  addColumn,
  changeColumnOnDrag,
} = mainDataSlice.actions;

export default mainDataSlice.reducer;
