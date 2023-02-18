import { playersVolumeUpdate } from "../../redux/actions";

import React, { useEffect} from "react";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux/es/exports";



const VolumeHandlerComponent = () => {
    let playerCords = useSelector((state) => state.playerCordsReducer);
    let room = useSelector((state) => state.roomReducer.room);
    let user = useSelector((state) => state.userReducer.user);
    let dispatch = useDispatch();
    useEffect(() => {
        if(playerCords.playerCords.size != 0){
            let currentUserTeam = room.players.get( user.id ).team;
            let currentUserId = user.id;
            let playerVolume = new Map();
            let currentUserCoord = playerCords.playerCords.get(currentUserId);

            for (let [player, coord] of playerCords.playerCords.entries()) {
                
                if(room.players.get(player).team != currentUserTeam){
                    
                    let distance = Math.sqrt( Math.pow(currentUserCoord.x - coord.x,2) + Math.pow(currentUserCoord.y - coord.y,2));
                    let newVolume = 1000/distance;
                    newVolume = newVolume > 1 ? 1 : newVolume; // volume can't be > 1;
                    playerVolume.set(player, newVolume);

                }
                else{
                    playerVolume.set(player,1); // volume set at 100% if same team;
                }
            }
            dispatch(playersVolumeUpdate(playerVolume));
        }
    },[playerCords.update]);

    return <></>;
};
export default VolumeHandlerComponent;
