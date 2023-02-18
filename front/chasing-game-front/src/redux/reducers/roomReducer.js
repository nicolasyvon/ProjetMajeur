let initState = {
  room: {},
};

const roomReducer = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_ROOM":
      return { room: action.obj };

    default:
      return state;
  }
};

export default roomReducer;
