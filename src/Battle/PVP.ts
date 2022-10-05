import Fighter from '../Fighter';
import Battle from './Battle';

class PVP extends Battle {
  player2: Fighter;

  constructor(player: Fighter, player2: Fighter) {
    super(player);
    this.player2 = player2;
  }

  fight(): number {
    const { player, player2 } = this;
    while (player.lifePoints > 0 && player2.lifePoints > 0) {
      player.attack(player2);
      player2.attack(player);
    }

    return super.fight();
  }
}

export default PVP;