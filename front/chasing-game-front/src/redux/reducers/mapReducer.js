let initState = {
    map: {},
  };
  
  const mapReducer = (state = initState, action) => {
    switch (action.type) {
      case "UPDATE_MAP":
        return { map: action.obj };
  
      default:
        return state;
    }
  };
  
  export default mapReducer;
  