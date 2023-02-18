import { useSelector } from "react-redux/es/exports";
import { useState, useEffect } from "react";
import { API_GAME } from "../../ressource/config";

const Timer = () => {
  let timer = useSelector((state) => state.timerReducer.timer);

  const [counter, setCounter] = useState(10);

  useEffect(() => {
    if (counter === 0) announceVictory();
    //il faudrait utiliser la variable timer plutôt que la valeur de counter entrée  en dur
    const countdown =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => {
      clearInterval(countdown);
    };
  }, [counter]);

  async function announceVictory() {
    console.log("countdown done");
    const response = await fetch(API_GAME + "announceVictory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //quoi envoyer comme info ?
      body: JSON.stringify({}),
    });
    if (!response.ok) {
      alert("Error");
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      // socket.emit("userJoined", user.id);
    }
  }

  return (
    <div className="ml-6">
      <h1 className="text-2xl">Timer</h1>
      <h1 className="text-2xl">{counter} s</h1>
      {/* <h1 className="text-2xl">{timer} s</h1> */}
    </div>
  );
};

export default Timer;
