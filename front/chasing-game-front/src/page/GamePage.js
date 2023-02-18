import GameComponent from "../game/GameComponent";

import Timer from "../component/timer/Timer";

const GamePage = (props) => {

  const page = (
    <div>
      <div className="flex justify-center">
        <div></div>
        <GameComponent />
        {/* <Timer /> */}
      </div>
    </div>
  );
  return page;
};
export default GamePage;
