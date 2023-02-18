
let mapmapobject = new Map();
let thiefMap = new Map();
let policeMap = new Map();
thiefMap.set('chest',{sender:"steal", receiver:"open"});
thiefMap.set('police',{sender:"none", receiver:"none"});
thiefMap.set('thief',{sender:"none", receiver:"none"});

policeMap.set('thief',{sender:"arrest",receiver:"arrested"})
policeMap.set('chest',{sender:"none",receiver:"none"})
policeMap.set('police',{sender:"none", receiver:"none"});

mapmapobject.set("thief",thiefMap);
mapmapobject.set("police",policeMap);



export const interactiondata = mapmapobject;