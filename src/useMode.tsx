import React from "react";
import { useState } from "react";

export type ModeType = { darkMode: boolean; sidebar: boolean };

export type ModeManagerType = {
  darkMode: boolean;
  sidebar: boolean;
  toggleDark: () => void;
  toggleSideBar: () => void;
};

export function useModeManager(): ModeManagerType {
  const [mode, setMode] = useState<ModeType>({ darkMode: false, sidebar: true });

  return {
    darkMode: mode.darkMode,
    sidebar: mode.sidebar,

    toggleDark: () => {
      setMode((oldMode) => {
        return {
          ...oldMode,
          darkMode: !oldMode.darkMode,
        };
      });
    },

    toggleSideBar: () => {
      setMode((oldMode) => {
        return {
          ...oldMode,
          sidebar: !oldMode.sidebar,
        };
      });
    },
  };
}

// Create Context -- default value is stated or may be null there
export const ModeContext = React.createContext<ModeManagerType>({
  darkMode: false,
  sidebar: true,
  toggleDark: () => {},
  toggleSideBar: () => {},
});

// Create Component to put something in a Context
export function CreateContextMode(props: { children: any }): JSX.Element {
  const modeManager = useModeManager();

  return <ModeContext.Provider value={modeManager}>{props.children}</ModeContext.Provider>;
}

// TO USE CONTEXT IN THE COMPONENTS
export function useMode(): ModeManagerType {
  return React.useContext(ModeContext);
}
