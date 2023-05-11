import React from "react";
import "./App.scss";
import { Header } from "./components/Header";
import { Question } from "./components/Question";
const App = () => {
  return (
    <div className="App">
      <Header />
      <Question />
    </div>
  );
};

export default App;
