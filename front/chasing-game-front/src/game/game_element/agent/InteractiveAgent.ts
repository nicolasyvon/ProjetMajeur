import Agent from "./Agent";

interface InteractiveAgent {
    
    interactionResult(type:string);

    getDenomination(): string;

    getRange(): number;

    getX(): number;
    
    getY(): number;

    getId():number;

}
export default InteractiveAgent;