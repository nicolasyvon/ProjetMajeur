import Player from "../game_element/agent/living/Player.ts";
import Policier from "../game_element/agent/living/Policier.ts";
import Voleur from "../game_element/agent/living/Voleur.ts";

class Player_creator{

    static createPlayers(scene, mediator,playerCoords){
        let playersmap = new Map<string,Object>(scene.cache.custom.playerCache.get("players"));
        let currentPlayer = scene.cache.custom.playerCache.get("currentPlayer");
        console.log(playersmap)
        Array.from(playersmap.keys()).forEach((playerName) => {
            let player;
            let object = playersmap.get(playerName)!;
            
            if( object['team'] == "police"){
                player = new Policier(scene, mediator);
                player.create(playerCoords.police);

            }            
            else{
                player = new Voleur(scene, mediator);
                player.create(playerCoords.thief);

            }
            console.log(playerName)
            player.setId(playerName);

            if(playerName == currentPlayer.name){
                currentPlayer = player;
                mediator.setCurrent(player);
            }
            else{          
                mediator.register(player);
                player.sprite.removeAllListeners();
            }
            playersmap.set(playerName,player);
        });

        return [playersmap,currentPlayer];

    }

}

export default Player_creator