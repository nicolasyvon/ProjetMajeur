import React, { useState, useContext, useEffect } from "react";
import { useSelector } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";
import Phaser from "phaser";
import MainScene from "./scene/MainScene";
import EventDispatcher from "./network/EventDispatcher";
import { SocketContext } from "../ressource/socket";
import { API_GAME } from "../ressource/config";
import { playerCordsUpdate, playersCordsUpdate } from "../redux/actions";

import { useDispatch } from "react-redux/es/exports";

const GameComponent = () => {

    let map = useSelector((state) => state.mapReducer.map);
    let user = useSelector((state) => state.userReducer.user);
    let room = useSelector((state) => state.roomReducer.room);
    let navigate = useNavigate();

    let currentUser = user.id;

    //let map = [[5,5],[2,2]];
    let [emitter,setEmitter] = useState(null);
    let socket = useContext(SocketContext);

    let dispatch = useDispatch();


    function usePhaserGame(config) {
        const phaserGameRef = React.useRef(null);
        React.useEffect(() => {
            if (phaserGameRef.current) {
                return;
            }

            phaserGameRef.current = new Phaser.Game(config);
            phaserGameRef.current.cache.addCustom("mapCache").add("mapData",map);
            phaserGameRef.current.cache.addCustom("playerCache").add("currentPlayer",{name:currentUser,team:room.players.get(currentUser)});
            phaserGameRef.current.cache.addCustom("playerCache").add("players",room.players);

            // //Test unitaire
            // let playermap = new Map();
            // playermap.set("current", "police");
            // playermap.set("other", "thief");

            // phaserGameRef.current.cache.addCustom("playerCache").add("players",playermap);
            // phaserGameRef.current.cache.addCustom("playerCache").add("currentPlayer",{name:"current",team:playermap.get("current")});

            // map.objectCollection = [
            //     {
            //         type: "chest",
            //         coords: [
            //             {x: 300, y:400},
            //             {x: 600, y:400},
            //         ]
            //     }
            // ]
            // map.spawn =  { police:{
            //         x:0,
            //         y:400
            //     },

            //     thief:{
            //         x:800,
            //         y:400
            //     }
            // }
            let playerCoords = new Map();
            room.players.forEach((value,key)=>
            {
                playerCoords.set(key,value.team == "police"?map.spawn.police:map.spawn.thief);
            })

            //phaserGameRef.current.cache.addCustom("mapCache").add("mapData",map);

            dispatch(playersCordsUpdate(playerCoords));

            // phaserGameRef.current.cache.addCustom("mapCache").add("objectData", objectCollection);
            // phaserGameRef.current.cache.addCustom("mapCache").add("startCoords", startCoords);

            phaserGameRef.current.emitter = EventDispatcher.getInstance();
            setEmitter(phaserGameRef.current.emitter);       

            return () => {
                phaserGameRef.current.destroy(true);
                phaserGameRef.current = null;
            };
        }, [] /* only run once; config ref elided on purpose */);
        return phaserGameRef.current;
    }


  let config = {
    type: Phaser.WEBGL, // Définit le moteur graphique à utilisé CANVAS, WEBGL ou AUTO.
    width: 1000, // largeur de l'écran de jeu.
    height: 800, // hauteur de l'écran de jeu.
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    physics: {
      default: "matter",
      matter: {
        //debug: true,
        gravity: {
          x: 0,
          y: 0,
        },
      },
    },
    backgroundColor: "#FFFFFF",
    scene: [MainScene],
    parent: "game-content",
  };

  const game = usePhaserGame(config);

  function notifyPlayers(data) {
    fetch(API_GAME + "/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch((err) => alert(err));
  }

  useEffect(() => {
    if (emitter != null) {
      emitter.on("current_player_update", (args) => {
        notifyPlayers({
          roomName: room.name,
          player: currentUser,
          action: args.action,
          data: args.data,
        });
        if (args.action.includes("move")) {
          dispatch(playerCordsUpdate(currentUser, args.data.coord));
        }
      });

      socket.on("player_update", (args) => {
        emitter.emit("player_update", {
          player: args.player,
          action: args.action,
          data: args.data,
        });

        if (args.action.includes("move")) {

          dispatch(playerCordsUpdate(args.player, args.data.coord));
        }
      });

      socket.on("endGame", (args) => {
        alert(args.winner);
        navigate("/");
      });
    }
  }, [emitter]);

  return (
    <div>
      <div id="game-content" />
    </div>
  );
};
export default GameComponent;
