import { interactiondata } from "../../const/interaction_map_map_object";
import InteractiveAgent from "../../game_element/agent/InteractiveAgent.ts";
import getInteractible from "../getInteractible.ts";
import Phaser from "phaser";
import Mediator from "./Mediator.ts";
import Player from "../../game_element/agent/living/Player.ts";
class InteractionMediator implements Mediator{
    scene: Phaser.Scene;
    interactiveAgents: InteractiveAgent[];
    current:Player;

    constructor(scene){
        this.scene = scene;
        this.interactiveAgents = [];
        this.current = null;
    }

    register(agent:InteractiveAgent) {
        this.interactiveAgents.push(agent);
    }
    setCurrent(agent:InteractiveAgent) {
        this.current = agent;
    }

    notifylocal(sender:InteractiveAgent) {
        let receiverId,interactionResult;
        //let sender = this.interactiveAgents.find(agent => agent.getId() == senderId);
        let receiver = getInteractible(this.scene, sender.getRange(), this.interactiveAgents, sender.getX(), sender.getY());
        if (receiver != null) {
            [receiverId,interactionResult] = this.applyInteraction(sender, receiver);
        }
        return [receiverId,interactionResult];
    }

    notify(senderId:number, receiverId:number) {
        let list = [this.current,...this.interactiveAgents];
        let sender = list.find(agent => agent.getId() == senderId);
        let receiver = list.find(agent => agent.getId() == receiverId);
        this.applyInteraction(sender, receiver)
    }

    applyInteraction(sender?: InteractiveAgent, receiver?: InteractiveAgent) {
        let res = interactiondata.get(sender?.getDenomination()).get(receiver?.getDenomination());
        sender?.interactionResult(res.sender);
        receiver?.interactionResult(res.receiver);
        return [receiver?.getId(),res.sender];
    }

}
export default InteractionMediator;