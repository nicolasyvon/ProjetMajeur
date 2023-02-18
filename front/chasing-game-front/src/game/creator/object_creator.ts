import Chest from "../game_element/agent/interactive_object/Chest.ts";

class Object_Creator{

    static createObjects(objectCollection, scene, mediator){

        objectCollection.forEach((objectType) => {
            
            let object;

            if(objectType.type == "chest"){
                (objectType.coords).forEach((coord) => {
                    object = new Chest(scene, mediator);
                    object.create(coord);
                    mediator.register(object);
                })
            }
            // else : générate simpleBox
        });

    }

}
export default Object_Creator;