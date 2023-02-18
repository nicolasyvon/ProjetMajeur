export const userUpdate = (obj) => {
  return { type: "UPDATE_USER", obj: obj };
};

export const timerUpdate = (obj) => {
  return { type: "UPDATE_TIMER", obj: obj };
};

export const roomUpdate = (obj) => {
  return { type: "UPDATE_ROOM", obj: obj };
};

export const mapUpdate = (obj) => {
  return { type: "UPDATE_MAP", obj: obj };
};

export const playersCordsUpdate = (obj) => {
  return { type: "UPDATE_PLAYERCORDS", obj: obj };
};

export const playerCordsUpdate = (player, coord) => {
  return { type: "UPDATE_SINGLEPLAYERCORDS", player: player, coord: coord };
};

export const playersVolumeUpdate = (obj) => {
  return { type: "UPDATE_PLAYERVOLUME", obj: obj };
};
