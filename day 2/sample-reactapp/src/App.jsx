import { useState } from "react";
import "./App.css";
import { evaluate } from "mathjs";

function App() {
  const [display, setDisplay] = useState("");

  const buttons = [
    "C", "⌫", "/", "*",
    "7", "8", "9", "-",
    "4", "5", "6", "+",
    "1", "2", "3", "=",
    "0", "."
  ];

  const handleClick = (value) => {
    if (value === "C") {
      setDisplay("");
    } else if (value === "⌫") {
      setDisplay(display.slice(0, -1));
    } else if (value === "=") {
      try {
        const result = evaluate(display);
        setDisplay(result.toString());
      } catch {
        setDisplay("Error");
      }
    } else {
      setDisplay(display + value);
    }
  };

  return (
    <div className="app">
      <div className="glow-box">
        <input
          id="display"
          type="text"
          value={display}
          readOnly
        />

        <div className="buttons">
          {buttons.map((btn) => (
            <button
              key={btn}
              className={
                btn === "C"
                  ? "clear"
                  : btn === "="
                  ? "equal"
                  : ["+", "-", "*", "/"].includes(btn)
                  ? "operator"
                  : btn === "0"
                  ? "zero"
                  : ""
              }
              onClick={() => handleClick(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;