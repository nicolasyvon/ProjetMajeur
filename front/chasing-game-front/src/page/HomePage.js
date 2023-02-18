import { useState,useContext } from "react";
import { Await, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import { roomUpdate, userUpdate } from "../redux/actions/index";

import { FiSettings } from "react-icons/fi";
import { SocketContext } from "../ressource/socket";

import { API_MATCHHANDLER } from "../ressource/config";

const HomePage = () => {
  let [userName, setUserName] = useState("");
  let [roomName, setRoomName] = useState("");
  let socket = useContext(SocketContext);

  let navigate = useNavigate();

  let dispatch = useDispatch();

  const today = new Date();

  function handleOnChangeUserName(e) {
    setUserName(e.target.value);
  }

  function handleOnChangeRoomName(e) {
    setRoomName(e.target.value);
  }

  function handleOnClickCreate() {
    dispatch(
      userUpdate({
        id: userName + "/" + today.getSeconds() + today.getMilliseconds(),
        name: userName,
      })
    );
    navigate("/createRoom");
  }

  async function postJoinRoom() {
    let id = userName + "/" + today.getSeconds() + today.getMilliseconds()
    dispatch(
      userUpdate({
        id: id,
        name: userName,
      })
    );
    const resp = await fetch(API_MATCHHANDLER + "/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: id,
        roomName: roomName,
        isTeamPolice: null,
        socketid: socket.id
      }),
    });
    if (resp.ok){
      dispatch(roomUpdate({ name: roomName, players: new Map() }));
       socket.emit(
         "userJoined",
         id
       );
       navigate("/waitingPage");
    }
    else{
      alert("You cant join this room");
    }
    // .catch(err=> alert(err))
    // .then(response => {
    //   dispatch(roomUpdate({ name: roomName, players: new Map() }));
    //   socket.emit(
    //     "userJoined",
    //     id
    //   );
    //   navigate("/waitingPage");
    // })
    
  }

  return (
    <div className="grid place-items-center h-screen">
      <h1 className="text-6xl text-center">CHASING GAME</h1>
      <div className="flex justify-center mt-4">
        <p className="mx-2 font-bold">Choose a name :</p>
        <input
          type="text"
          id="username"
          placeholder="Name"
          className="text-center border-black border-2 rounded-lg"
          onChange={handleOnChangeUserName}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <input
            placeholder="Room Code"
            className="text-center border-black border-2 rounded-lg mx-2"
            onChange={handleOnChangeRoomName}
          />
          <button
            className="bg-blue-400 hover:bg-blue-500 w-40 rounded-lg p-4"
            disabled={!userName || !roomName}
            onClick={postJoinRoom}
          >
            JOIN
          </button>
        </div>
        <div>
          <button
            className="bg-green-400 hover:bg-green-500 w-40 rounded-lg p-4"
            disabled={!userName}
            onClick={handleOnClickCreate}
          >
            CREATE A GAME
          </button>
        </div>
      </div>
      <FiSettings size={25} className="text-center" />
    </div>
  );
};

export default HomePage;
