import GameModeInterface from "./GameModeInterface";

export default interface Builder {
  buildVictory(): void;
  buildTeamPercentage(): void;
  buildMap(): void;
  getGameMode(): GameModeInterface;
}
