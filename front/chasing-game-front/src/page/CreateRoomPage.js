import { Link, useNavigate } from "react-router-dom";
import { useRef, useContext, useState } from "react";

import { useSelector, useDispatch } from "react-redux/es/exports";

import { API_GAME, API_MATCHHANDLER } from "../ressource/config";
import { SocketContext } from "../ressource/socket";

import { roomUpdate, timerUpdate } from "../redux/actions";

import MyMap from "../component/map/Map";
import ThumbnailsContainer from "../component/map/ThumbnailsContainer";

const CreateRoomPage = () => {
  let [chooseMap, setChooseMap] = useState();
  let [gameDuration, setGameDuration] = useState(300);
  let [selectedMap, setSelectedMap] = useState({
    minlat: 48.8359,
    maxlat: 48.8545,
    minlon: 2.2752,
    maxlon: 2.3261,
  });
  let [gameMode, setGameMode] = useState("");

  let socket = useContext(SocketContext);

  let roomNameRef = new useRef();
  let numberPlayersRef = new useRef();
  // let randomTeamsRef = new useRef();
  // let privateRoomRef = new useRef();
  // let isTeamPoliceRef = new useRef();
  let chooseMapRef = new useRef();
  let gameModeRef = new useRef();
  let gameDurationRef = new useRef(300);

  let dispatch = useDispatch();
  let navigate = useNavigate();

  const selectMap = (map) => {
    setSelectedMap(map);
  };

  const selectGameMode = (gm) => {
    setGameMode(gm);
  };

  let user = useSelector((state) => state.userReducer.user);
  async function postCreateRoom() {
    dispatch(
      roomUpdate({
        name: roomNameRef.current.value,
        players: new Map(),
      })
    );
    dispatch(
      timerUpdate({
        timer: gameDurationRef.current.value,
      })
    );
    if (
      roomNameRef.current.value &&
      numberPlayersRef.current.value &&
      user.id
    ) {
      const response = await fetch(API_GAME + "create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomName: roomNameRef.current.value,
          host: user.id,
          roomOptions: {
            //   areTeamsRandom: randomTeamsRef.current.checked ? true : false,
            //   isPrivate: privateRoomRef.current.checked ? true : false,
            mapCoords: selectedMap,
            areTeamsRandom: true,
            isPrivate: true,
            sizeTeam: numberPlayersRef.current.value,
            gameMode: gameModeRef.current.checked
              ? "CatMouseBuilder"
              : "HoldUpBuilder",
            gameDuration: gameDuration,
          },
          isTeamPolice: null,
          socketid: socket.id,
        }),
      });
      if (!response.ok) {
        // alert("A room with this name already exists.");
        // document.getElementById("roomName").focus();
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        socket.emit("userJoined", user.id);
        navigate("/waitingPage");
      }
    }
  }

  function onChangeChooseMap() {
    setChooseMap(chooseMapRef.current.checked);
  }

  function onChangeGameMode() {
    setGameMode(gameModeRef.current.checked);
  }

  function onChangeGameDuration(e) {
    setGameDuration(e.target.value);
  }

  return (
    <div className="overflow-hidden">
      <div>
        <form className="bg-slate-100 rounded px-8 pt-6 pb-8 mb-4 m-auto h-full mt-16">
          <h1 className="text-3xl pb-3 text-center">Create a Room</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Room Name
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              id="roomName"
              type="text"
              ref={roomNameRef}
              placeholder="Room Name"
              required
            />
          </div>
          <fieldset>
            <legend className="text-gray-700 text-sm font-bold mb-2">
              Room Options
            </legend>
            <div>
              <label for="numberPlayers" className="mr-2">
                Number Of Players
              </label>
              <input
                type="number"
                id="numberPlayers"
                name="numberPlayers"
                min="2"
                max="16"
                ref={numberPlayersRef}
                className="text-center"
                required
              />
            </div>
            <div className="flex">
              <div className="mr-3 mt-4 text-sm font-medium">Random Map</div>
              {/* <div className="mt-4">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    class="sr-only peer"
                    ref={chooseMapRef}
                    onChange={onChangeChooseMap}
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span class="ml-3 text-sm font-medium">Choose Map</span>
                </label>
              </div> */}
            </div>
            <ThumbnailsContainer
              className="mt-4"
              selectMap={selectMap}
              intent="map"
            />
            <div className="flex">
              <div className="mt-4">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    class="sr-only peer"
                    ref={gameModeRef}
                    onChange={onChangeGameMode}
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span class="ml-3 text-sm font-medium">
                    Change Game Mode (Default: Hold Up)
                  </span>
                </label>
              </div>
            </div>
            {gameMode && (
              <ThumbnailsContainer
                className="mt-4"
                selectGameMode={selectGameMode}
                intent="gameMode"
              />
            )}
            <div className="text-center">
              <div className="mr-3 mt-4 text-sm font-medium">
                Game Duration (in seconds)
              </div>
              <input
                type="number"
                value={gameDuration}
                onChange={onChangeGameDuration}
              />
            </div>
            {/* <div className="flex justify-around mt-2">
            <div>
              <input
                type="checkbox"
                id="randomTeams"
                name="randomTeams"
                ref={randomTeamsRef}
              />
              <label for="randomTeams" className="ml-2">
                Random Teams
              </label>
            </div>

            <div>
              <input
                type="checkbox"
                id="privateRoom"
                name="privateRoom"
                ref={privateRoomRef}
              />
              <label for="privateRoom" className="ml-2">
                Private Room
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="isTeamPolice"
                name="isTeamPolice"
                ref={isTeamPoliceRef}
              />
              <label for="isTeamPolice" className="ml-2">
                Join Police Team
              </label>
            </div>
          </div> */}
          </fieldset>

          <div className="flex items-center justify-between">
            <Link to="/">
              <button
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                type="button"
              >
                CANCEL
              </button>
            </Link>
            <button
              className="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
              type="button"
              onClick={postCreateRoom}
            >
              CREATE
            </button>
          </div>
        </form>
      </div>
      {/* <div>
        {chooseMap ? (
          <MyMap />
        ) : (
          <div className="flex h-screen justify-center items-center">
            <div className="text-4xl">???</div>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default CreateRoomPage;
