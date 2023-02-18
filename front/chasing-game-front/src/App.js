import HomePage from "./page/HomePage";
import CreateRoomPage from "./page/CreateRoomPage";
import WaitingPage from "./page/WaitingPage";
import GamePage from "./page/GamePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {SocketContext, socket} from './ressource/socket';
import LoadingPage from "./page/LoadingPage";
import VocalComponent from "./component/vocal/VocalComponent";
import VolumeHandlerComponent from "./component/vocal/VolumeHandlerComponent";

const App = () => {
  return (
    <div>
      <SocketContext.Provider value={socket}>
        <Router>
          <Routes>
            <Route index path="/" element={<HomePage />} />
            <Route index path="/game" element={<GamePage />} /> 
            <Route path="/createRoom" element={<CreateRoomPage />}/>
            <Route path="/waitingPage" element={<WaitingPage />}/>
            <Route path="/loadingPage" element={<LoadingPage />}/>
          </Routes>
        </Router>
      <VocalComponent />
      <VolumeHandlerComponent />
      </SocketContext.Provider>

    </div>
  );
};

export default App;