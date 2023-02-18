let initState =  {playerCords:new Map(),update:0};
  
  const playerCordsReducer = (state = initState, action) => {
    switch (action.type) {
      case "UPDATE_PLAYERCORDS":
        state.update += 1;
        return  {playerCords:action.obj,update:state.update};

      case "UPDATE_SINGLEPLAYERCORDS":  
        state.update += 1;
        state.playerCords.set(action.player,action.coord);
        return {playerCords:state.playerCords,update:state.update};
  
      default:
        return state;
    }
  };
  
  export default playerCordsReducer;