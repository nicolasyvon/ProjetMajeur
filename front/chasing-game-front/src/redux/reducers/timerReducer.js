let initState = {
  timer: {},
};

const timerReducer = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_TIMER":
      return { timer: action.obj };

    default:
      return state;
  }
};

export default timerReducer;
