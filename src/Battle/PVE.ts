import Fighter, { SimpleFighter } from '../Fighter';
import Monster from '../Monster';
import Battle from './Battle';

class PVE extends Battle {
  player: Fighter;
  enviroment: (Fighter | SimpleFighter | Monster)[];

  constructor(
    player: Fighter,
    enviroment: (Fighter | SimpleFighter | Monster)[],
  ) {
    super(player);
    this.enviroment = enviroment;
  }

  fight(): number {
    const { player, enviroment } = this;
    enviroment.every((enemy) => {
      while (player.lifePoints > 0 && enemy.lifePoints > 0) {
        player.attack(enemy);
        enemy.attack(player);
      }

      return player.lifePoints >= 0;
    });
    
    return super.fight();
  }
}

export default PVE;