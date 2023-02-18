function getInteractible(scene, range, interactive_agents, posX, posY) {
    let res = null;
    let bodies = interactive_agents.map( agent => agent.sprite.body);
    let vertices = [
        {
            x: posX - range,
            y: posY - range,
        },
        {
            x: posX + range,
            y: posY - range,
        },
        {
            x: posX + range,
            y: posY + range,
        },
        {
            x: posX - range,
            y: posY + range,
        }
    ]
    let bounds = scene.matter.bounds.create(vertices);
    let listInteract = scene.matter.query.region(bodies, bounds);
    let minDist = -1;
    let body_res;
    listInteract.forEach(body => {
        let norme = Math.pow(Math.pow(body.position.x - posX, 2) + Math.pow(body.position.y - posY, 2),0.5);
        if (minDist == -1 || norme < minDist) {
            minDist = norme;
            body_res = body;
        }
    });
    if(body_res != null){
       res = interactive_agents.find(agent => agent.sprite.body.id == body_res.id);
    }
    return res;
}
export default getInteractible;