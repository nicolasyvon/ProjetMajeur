import { useState } from "react";

import Thumbnail from "./Thumbnail";

const ThumbnailsContainer = (props) => {
  const [selectedMap, setSelectedMap] = useState({
    minlat: 48.8359,
    maxlat: 48.8545,
    minlon: 2.2752,
    maxlon: 2.3261,
  });
  const [selectedGameMode, setSelectedGameMode] = useState();

  if (props.intent == "map") {
    return (
      <div className="mt-4">
        <div className="flex justify-around">
          <Thumbnail
            mapName="Lyon"
            changed={() => {
              props.selectMap({
                minlat: 45.75641,
                maxlat: 45.75874,
                minlon: 4.82985,
                maxlon: 4.83395,
              });
              setSelectedMap({
                minlat: 45.75641,
                maxlat: 45.75874,
                minlon: 4.82985,
                maxlon: 4.83395,
              });
            }}
            id="Lyon"
            isSelected={selectedMap["minlat"] === 45.75641}
            label="Lyon"
            value="Lyon"
            image="assets/lyon.png"
          />
          <Thumbnail
            mapName="Paris"
            changed={() => {
              props.selectMap({
                minlat: 48.884742987001786,
                maxlat: 48.88681356856101,
                minlon: 2.341077525534181,
                maxlon: 2.3451538879792544,
              });
              setSelectedMap({
                minlat: 48.884742987001786,
                maxlat: 48.88681356856101,
                minlon: 2.341077525534181,
                maxlon: 2.3451538879792544,
              });
            }}
            id="Paris"
            isSelected={selectedMap["minlat"] === 48.884742987001786}
            label="Paris"
            value="Paris"
            image="assets/paris.png"
          />
          <Thumbnail
            mapName="Londres"
            changed={() => {
              props.selectMap({
                minlat: 51.50754,
                maxlat: 51.50876,
                minlon: -0.12936,
                maxlon: -0.12675,
              });
              setSelectedMap({
                minlat: 51.50754,
                maxlat: 51.50876,
                minlon: -0.12936,
                maxlon: -0.12675,
              });
            }}
            id="Londres"
            isSelected={selectedMap["minlat"] === 51.50754}
            label="Londres"
            value="Londres"
            image="assets/londres.png"
          />
          {/* <Thumbnail
            mapName="Custom"
            changed={() => {
              props.selectMap("Custom");
              setSelectedMap("Custom");
            }}
            id="Custom"
            isSelected={selectedMap === "Custom"}
            label="Custom"
            value="Custom"
            image="assets/custom.png"
          /> */}
        </div>
      </div>
    );
  } else {
    return (
      <div className="mt-4">
        <div className="flex justify-around">
          <Thumbnail
            mapName="Chasing"
            changed={() => {
              props.selectGameMode("CatMouseBuilder");
              setSelectedGameMode("CatMouseBuilder");
            }}
            id="CatMouseBuilder"
            isSelected={selectedGameMode === "CatMouseBuilder"}
            label="CatMouseBuilder"
            value="CatMouseBuilder"
            image="assets/chasingGame.png"
          />
          <Thumbnail
            mapName="Hold Up"
            changed={() => {
              props.selectGameMode("HoldUpBuilder");
              setSelectedGameMode("HoldUpBuilder");
            }}
            id="HoldUpBuilder"
            isSelected={selectedGameMode === "HoldUpBuilder"}
            label="HoldUpBuilder"
            value="HoldUpBuilder"
            image="assets/holdup.png"
          />
        </div>
      </div>
    );
  }
};

export default ThumbnailsContainer;
