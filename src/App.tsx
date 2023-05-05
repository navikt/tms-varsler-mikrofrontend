import React from "react";
import MainPage from "./components/main-page/MainPage";
import style from "./App.module.css";

function App() {
  return (
    <main className={style.main}>
      <div className={style.app}>
        <MainPage />
      </div>
    </main>
  );
}

export default App;
