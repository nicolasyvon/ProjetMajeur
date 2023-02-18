import React, { useEffect, useState, useContext, useRef } from "react";
import { SocketContext } from "../../ressource/socket";
import { useSelector } from "react-redux/es/exports";
import Peer from "simple-peer";

const Audio = (props) => {
    const ref = useRef();
    useEffect(() => {
        props.peerRef.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <audio id={props.peerRef.peerName} autoPlay ref={ref} />
    );
}

const VocalComponent = (props) => {

    const [peers, setPeers] = useState([]);
    let room = useSelector((state) => state.roomReducer.room);
    let playerVolume = useSelector((state) => state.playerVolumeReducer);
    let user = useSelector((state) => state.userReducer.user);
    let userid = user.id;
    let currentUserTeam; 
    let socket = useContext(SocketContext);
    const peersRef = useRef([]);

    useEffect(() => {
        if( !!room.players && 
            Array.from(room.players.values()).length>0 && peers.length == 0){
            currentUserTeam =  room.players.get( user.id ).team;
            navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(stream => {
                const peers = [];
                for (let [name, players] of room.players.entries()) {
                    if( players.name != userid){
                        const peer = createPeer(players.socketid, socket.id, stream);
                        peersRef.current.push({
                            peerID: players.socketid,
                            peerTeam: players.team,
                            peerName: name,
                            peer,
                        })
                        peers.push(peer);
                    }
                        
                    }
                    setPeers(peers);
                
                    socket.on("user joined", payload => {
                        const peer = addPeer(payload.signal, payload.src, stream);
                        peersRef.current.push({
                            peerID: payload.src,
                            peerTeam: payload.team,
                            peerName: payload.userid,
                            peer,
                        })
        
                        setPeers(users => [...users, peer]);
                    });
                })
    
                
    
                socket.on("receiving returned signal", payload => {
    
                    const item = peersRef.current.find(p => p.peerID === payload.src);
                    item.peer.signal(payload.signal);
                });
        }
    }, [room]);

    function createPeer(userToSignal, src, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socket.emit("sending signal", { userToSignal, src, signal, userid, currentUserTeam })
        })

        return peer;
    }

    function addPeer(incomingSignal, dest, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socket.emit("returning signal", { signal, dest })
        })

        peer.signal(incomingSignal);
        return peer;
    }

    useEffect(() => {
        if(playerVolume.playerVolume.size != 0){

            for (let [id, volume] of playerVolume.playerVolume.entries()) {
                if(id != user.id){
                    let audio = document.getElementById(id);
                    let muted = false;
                    if(volume != 1) {
                        muted = true;
                    }
                    audio.setAttribute("muted",muted)

                }
            }

        }
    },[playerVolume.update]);


    return (
        <div>
            {peersRef.current.map((peerRef, index) => {
                return (
                    <div>
                        <Audio key={index} peerRef={peerRef} className="audio"/>
                    </div>
                );
            })}
        </div>
    );
}

export default VocalComponent;