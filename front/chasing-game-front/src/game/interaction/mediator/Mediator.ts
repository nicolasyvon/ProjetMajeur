import InteractiveAgent from "../../game_element/agent/InteractiveAgent";

interface Mediator {

    register(agent:InteractiveAgent);
    notifylocal(sender:InteractiveAgent);
    notify(senderId:number, receiver:number);

}
export default Mediator;