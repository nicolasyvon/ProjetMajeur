let initState =  {playerVolume:new Map(),update:0};
  
  const playerVolumeReducer = (state = initState, action) => {
    switch (action.type) {
      case "UPDATE_PLAYERVOLUME":
        state.update += 1;
        return  {playerVolume:action.obj,update:state.update};
  
      default:
        return state;
    }
  };
  
  export default playerVolumeReducer;