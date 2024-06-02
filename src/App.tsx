import React, { useEffect, useState } from "react";
import hole from "./assets/hole.png";
import mole from "./assets/mole.jpg";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [moles, setMoles] = useState<boolean[]>(new Array(9).fill(false));

  function setMolesVisibility(index: number, isVisible: boolean) {
    setMoles((curMoles) => {
      const newMoles = [...curMoles];
      newMoles[index] = isVisible;
      return newMoles;
    });
  }

  function removeHoles(index: number) {
    if (!moles[index]) return;
    setMolesVisibility(index, false);
    setScore((score) => score + 1);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * moles.length);
      setMolesVisibility(randomIndex, true);
      setTimeout(() => {
        setMolesVisibility(randomIndex, false);
      }, 600);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [moles]);

  return (
    <>
      <h1>Score {score}</h1>
      <div className="App">
        {moles.map((isMoles, index) => (
          <img
            key={index}
            src={isMoles ? mole : hole}
            onClick={() => {
              removeHoles(index);
            }}
          />
        ))}
      </div>
    </>
  );
}

export default App;
