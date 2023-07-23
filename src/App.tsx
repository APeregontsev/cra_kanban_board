import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header/Header";
import { useState } from "react";
import classNames from "classnames";
import ShowButton from "./UI/ShowButton/ShowButton";
import MainBlock from "./Components/Mainblock/Mainblock";
import { useMode } from "./useMode";

function App() {
  const mode = useMode();

  // Styles
  const wrapperStyle = classNames("wrapper", { dark: mode.darkMode });

  return (
    <div className={wrapperStyle}>
      <Sidebar />

      <div className="main-block-wrapper">
        <Header sidebarVisibility={mode.sidebar} />

        <MainBlock />

        <ShowButton />
      </div>
    </div>
  );
}

export default App;
