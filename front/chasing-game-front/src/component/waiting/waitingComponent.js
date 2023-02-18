import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux/es/exports";

import { useState, useEffect, useContext } from "react";
import {
  API_GAME,
  API_MAPGENERATOR,
  API_MATCHHANDLER,
} from "../../ressource/config";
import { useNavigate } from "react-router-dom";

import { mapUpdate, roomUpdate } from "../../redux/actions";
import { SocketContext } from "../../ressource/socket";

const WaitingComponent = () => {
  const [playersInRoom, setPlayersInRoom] = useState(new Map());
  const [host, setHost] = useState("");

  let user = useSelector((state) => state.userReducer.user);
  let room = useSelector((state) => state.roomReducer.room);
  let socket = useContext(SocketContext);
  let [isMapCreated, setIsMapCreated] = useState(false);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  socket.on("userJoinedRoom", (user) => {
    setPlayersInRoom(
      (map) =>
        new Map(
          map.set(user.userName, {
            team: user.isTeamPolice ? "police" : "thief",
            socketid: user.socketid,
          })
        )
    );
  });

  socket.on("gameStarted", (data) => {
    fetch(API_GAME + `/getMap?roomName=${room.name}`)
      .then((data) => data.json())
      .then((data) => {
        dispatch(mapUpdate(data));
        navigate("/game");
      })
      .catch((err) => alert(err));
  });

  socket.on("mapLoaded", (data) => {
    setIsMapCreated(true);
  });

  useEffect(() => {
    fetch(API_MATCHHANDLER + `/getPlayerInRoom?roomName=${room.name}`)
      .then((data) => data.json())
      .then((data) => {
        setHost(data.host);
        let temp = new Map();
        data.players.forEach((player, index) => {
          temp.set(player, {
            team: data.team[index],
            socketid: data.socketids[index],
          });
        });
        setPlayersInRoom(temp);
      })
      .catch((err) => alert(err));
  }, []);

  useEffect(() => {
    if (Array.from(playersInRoom.keys()).length > 0) {
      dispatch(
        roomUpdate({
          name: room.name,
          players: playersInRoom,
        })
      );
    }
  }, [playersInRoom]);

  function Launch() {
    fetch(API_MATCHHANDLER + "/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roomName: room.name,
      }),
    }).catch((err) => {
      throw new Error(`HTTP error! Status: ${err}`);
    });
  }

  return (
    <div>
      <h1 className="text-2xl">{room.name}</h1>
      <h2 className="text-xl">Created by {host.split("/")[0]}</h2>
      <table id="table-users">
        <tr>
          <th>Players in the lobby</th>
        </tr>
        {Array.from(playersInRoom.keys()).map((player, index) => {
          return (
            <tr className="border-b border-black h-10" key={index}>
              <td>{player.split("/")[0]}</td>
            </tr>
          );
        })}
      </table>
      <button
        className="bg-green-400 hover:bg-green-500 w-40 rounded-lg p-4"
        onClick={Launch}
        disabled={!isMapCreated}
        hidden={host !== user.id}
      >
        {isMapCreated ? "LAUNCH GAME" : "WAITING FOR MAP GENERATION"}
      </button>
    </div>
  );
};

//   useEffect(() => {
//     if (Array.from(playersInRoom.keys()).length > 0) {
//       dispatch(
//         roomUpdate({
//           name: room.name,
//           players: playersInRoom,
//         })
//       );
//     }
//   }, [playersInRoom]);

//   function Launch() {
//     fetch(API_MATCHHANDLER + "/start", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         roomName: room.name,
//       }),
//     }).catch((err) => {
//       throw new Error(`HTTP error! Status: ${err}`);
//     });
//   }

//   return (
//     <div>
//       <h1 className="text-2xl">{room.name}</h1>
//       <h2 className="text-xl">Created by {host.split("/")[0]}</h2>
//       <table id="table-users">
//         <tr>
//           <th>Players in the lobby</th>
//         </tr>
//         {Array.from(playersInRoom.keys()).map((player, index) => {
//           return (
//             <tr className="border-b border-black h-10" key={index}>
//               <td>{player.split("/")[0]}</td>
//             </tr>
//           );
//         })}
//       </table>
//       <button
//         className="bg-green-400 hover:bg-green-500 w-40 rounded-lg p-4"
//         onClick={Launch}
//         hidden={host.split("/")[0] !== user.name}
//       >
//         LAUNCH GAME
//       </button>
//     </div>
//   );
// };

export default WaitingComponent;
