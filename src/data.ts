export type ID = number;

export type Board = {
  id: ID;
  name: string;
  columnsIncluded: ID[];
};

export type Column = {
  id: ID;
  name: string;
};

export type Task = {
  id: ID;
  boardId: ID;
  columnId: ID;
  title: string;
  description?: string;
};

export type SubTask = {
  id: ID;
  taskId: ID;
  name: string;
  done: boolean;
};

export type Data = {
  boards: Board[];
  columns: Column[];
  tasks: Task[];
  subtasks: SubTask[];
};

export const data: Data = {
  boards: [
    { id: 1, name: "Platform Launch", columnsIncluded: [10, 11, 12] },
    { id: 2, name: "Marketing Plan", columnsIncluded: [11, 12] },
    { id: 3, name: "Roadmap", columnsIncluded: [10, 12] },
  ],

  columns: [
    { id: 10, name: "Todo" },
    { id: 11, name: "Doing" },
    { id: 12, name: "Done" },
  ],
  tasks: [
    {
      id: 100,
      boardId: 1,
      columnId: 10,
      title: "Build UI for onboarding flow",
      description: "Some description text here",
    },
    {
      id: 101,
      boardId: 1,
      columnId: 10,
      title: "Build UI for search",
      description: "Some description text here",
    },
    {
      id: 102,
      boardId: 1,
      columnId: 10,
      title: "Create template structures",
      description: "Some description text here",
    },
    {
      id: 103,
      boardId: 1,
      columnId: 10,
      title: "QA and test all major user journeys",
      description: "Some description text here",
    },

    {
      id: 104,
      boardId: 1,
      columnId: 11,
      title: "Design settings and search pages",
      description: "Some description text here",
    },
    {
      id: 105,
      boardId: 1,
      columnId: 11,
      title: "Add account management endpoints",
      description: "Some description text here",
    },
    {
      id: 106,
      boardId: 1,
      columnId: 11,
      title: "Design onboarding flow",
      description: "Some description text here",
    },
    {
      id: 107,
      boardId: 1,
      columnId: 11,
      title: "Add search enpoints",
      description: "Some description text here",
    },
    {
      id: 108,
      boardId: 1,
      columnId: 11,
      title: "Add authentication endpoints",
      description: "Some description text here",
    },
    {
      id: 109,
      boardId: 1,
      columnId: 11,
      title: "Research pricing points of various competitors and trial different business models",
      description: "Some description text here",
    },

    {
      id: 110,
      boardId: 1,
      columnId: 12,
      title: "Conduct 5 wireframe tests",
      description: "Some description text here",
    },
    {
      id: 111,
      boardId: 1,
      columnId: 12,
      title: "Create wireframe prototype",
      description: "Some description text here",
    },
    {
      id: 112,
      boardId: 1,
      columnId: 12,
      title: "Review results of usability tests and iterate",
      description: "Some description text here",
    },
    {
      id: 113,
      boardId: 1,
      columnId: 12,
      title: "Create paper prototypes and conduct 10 usability tests with potential customers",
      description: "Some description text here",
    },
    {
      id: 114,
      boardId: 1,
      columnId: 12,
      title: "Market discovery",
      description: "Some description text here",
    },
    {
      id: 115,
      boardId: 1,
      columnId: 12,
      title: "Competitor analysis",
      description: "Some description text here",
    },
    {
      id: 116,
      boardId: 1,
      columnId: 12,
      title: "Research the market",
      description: "Some description text here",
    },
    {
      id: 117,
      boardId: 2,
      columnId: 11,
      title: "Add search enpoints",
      description: "Some description text here",
    },
    {
      id: 118,
      boardId: 2,
      columnId: 11,
      title: "Add authentication endpoints",
      description: "Some description text here",
    },
    {
      id: 119,
      boardId: 2,
      columnId: 11,
      title: "Research pricing points of various competitors and trial different business models",
      description: "Some description text here",
    },

    {
      id: 120,
      boardId: 2,
      columnId: 12,
      title: "Conduct 5 wireframe tests",
      description: "Some description text here",
    },
    {
      id: 121,
      boardId: 2,
      columnId: 12,
      title: "Create wireframe prototype",
      description: "Some description text here",
    },
  ],

  subtasks: [
    { id: 1, taskId: 100, name: "Research competitor pricing and business models", done: true },
    { id: 2, taskId: 100, name: "Outline a business model that works for our solution", done: true },
    {
      id: 3,
      taskId: 100,
      name: "Talk to potential customers about our proposed solution and ask for fair price expectancy",
      done: false,
    },
    { id: 4, taskId: 101, name: "Research competitor pricing and business models", done: true },
    { id: 5, taskId: 101, name: "Outline a business model that works for our solution", done: true },
    {
      id: 6,
      taskId: 101,
      name: "Talk to potential customers about our proposed solution and ask for fair price expectancy",
      done: false,
    },
    { id: 7, taskId: 102, name: "Research competitor pricing and business models", done: true },
    { id: 8, taskId: 102, name: "Outline a business model that works for our solution", done: true },
    {
      id: 9,
      taskId: 102,
      name: "Talk to potential customers about our proposed solution and ask for fair price expectancy",
      done: false,
    },
    { id: 10, taskId: 105, name: "Research competitor pricing and business models", done: true },
    { id: 11, taskId: 105, name: "Outline a business model that works for our solution", done: true },
    {
      id: 12,
      taskId: 105,
      name: "Talk to potential customers about our proposed solution and ask for fair price expectancy",
      done: false,
    },
    { id: 13, taskId: 104, name: "Research competitor pricing and business models", done: true },
    { id: 14, taskId: 104, name: "Outline a business model that works for our solution", done: true },
    {
      id: 15,
      taskId: 104,
      name: "Talk to potential customers about our proposed solution and ask for fair price expectancy",
      done: false,
    },
  ],
};
